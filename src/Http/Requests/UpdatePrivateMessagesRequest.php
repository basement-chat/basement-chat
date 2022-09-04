<?php

namespace Haemanthus\Basement\Http\Requests;

use Haemanthus\Basement\Data\PrivateMessageData;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use Spatie\LaravelData\DataCollection;

class UpdatePrivateMessagesRequest extends FormRequest
{
    /**
     * Operation to mark private messages as read.
     */
    protected const MARK_AS_READ_OPERATION = 'mark as read';

    /**
     * Private messages list with mark as read operation.
     *
     * @var \Spatie\LaravelData\DataCollection
     */
    protected DataCollection $privateMessagesWithMarkAsReadOperation;

    /**
     * Validate if the given private messages can be marked as read by the user.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    protected function validateMarkAsReadOperation(Validator $validator): void
    {
        $this->privateMessagesWithMarkAsReadOperation = PrivateMessageData::collectionFromId($this->safe()
            ->collect()
            ->where('operation', self::MARK_AS_READ_OPERATION)
            ->pluck('value.id')
            ->all());

        $this->privateMessagesWithMarkAsReadOperation
            ->toCollection()
            ->each(function (PrivateMessageData $data, int $key) use ($validator): void {
                if ($data->receiver_id === Auth::id()) {
                    return;
                }

                $validator->errors()->add(
                    key: "{$key}.value.id",
                    message: "The given {$key}.value.id cannot be marked as received because you didn't receive this private message",
                );
            });
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            '*.operation' => ['required', Rule::in([self::MARK_AS_READ_OPERATION])],
            '*.value.id' => ['required', 'numeric', 'integer'],
        ];
    }

    /**
     * Get private messages request that need to be marked as read.
     *
     * @return \Spatie\LaravelData\DataCollection
     */
    public function privateMessagesWithMarkAsReadOperation(): DataCollection
    {
        return $this->privateMessagesWithMarkAsReadOperation;
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $this->validateMarkAsReadOperation($validator);
        });
    }
}
