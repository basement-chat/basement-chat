<?php

declare(strict_types=1);

namespace BasementChat\Basement\Http\Requests;

use BasementChat\Basement\Data\PrivateMessageData;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdatePrivateMessagesRequest extends FormRequest
{
    /**
     * Operation to mark private messages as read.
     */
    protected const MARK_AS_READ_OPERATION = 'mark as read';

    /**
     * Private messages list with mark as read operation.
     */
    protected Collection $markAsReadOperation;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string,array<mixed>>
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
     */
    public function markAsReadOperation(): Collection
    {
        return $this->markAsReadOperation;
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($this->collect()->count() === 0) {
                $validator->errors()->add(key: '*', message: 'The operation must have at least 1 items.');
            }

            $this->validateMarkAsReadOperation($validator);
        });
    }

    /**
     * Validate if the given private messages can be marked as read by the user.
     */
    protected function validateMarkAsReadOperation(Validator $validator): void
    {
        /** @var array<int,int> $messagesId */
        $messagesId = $this
            ->collect()
            ->where(key: 'operation', operator: self::MARK_AS_READ_OPERATION)
            ->pluck('value.id')
            ->all();

        $this->markAsReadOperation = PrivateMessageData::collectionFromId($messagesId);

        /** @var \Illuminate\Support\Collection<int,\BasementChat\Basement\Data\PrivateMessageData> $privateMessages */
        $privateMessages = $this->markAsReadOperation;

        $privateMessages->each(static function (PrivateMessageData $data, int $key) use ($validator): void {
            if ($data->receiver_id === Auth::id()) {
                return;
            }

            $validator->errors()->add(
                key: "{$key}.value.id",
                message: "The given {$key}.value.id cannot be marked as received
                    because you didn't receive this private message",
            );
        });
    }
}
