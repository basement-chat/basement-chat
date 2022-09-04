<?php

declare(strict_types=1);

namespace Haemanthus\Basement\Http\Controllers\Api;

use Haemanthus\Basement\Contracts\AllPrivateMessages;
use Haemanthus\Basement\Contracts\MarkPrivatesMessagesAsRead;
use Haemanthus\Basement\Contracts\SendPrivateMessage;
use Haemanthus\Basement\Data\PrivateMessageData;
use Haemanthus\Basement\Enums\MessageType;
use Haemanthus\Basement\Http\Requests\StorePrivateMessageRequest;
use Haemanthus\Basement\Http\Requests\UpdatePrivateMessagesRequest;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PrivateMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User  $contact
     *
     * @see \Haemanthus\Basement\BasementServiceProvider about how the $contact parameter is resolved
     */
    public function index(Authenticatable $contact, AllPrivateMessages $allPrivateMessages): JsonResponse
    {
        /** @var \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $user */
        $user = Auth::user();

        $messages = $allPrivateMessages->allBetweenTwoUsers(receiver: $user, sender: $contact);

        return JsonResource::collection($messages->items())->response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User  $contact
     *
     * @see \Haemanthus\Basement\BasementServiceProvider about how the $contact parameter is resolved
     */
    public function store(
        Authenticatable $contact,
        StorePrivateMessageRequest $request,
        SendPrivateMessage $sendPrivateMessage
    ): JsonResponse {
        /** @var int $senderId */
        $senderId = Auth::id();

        /** @var string $value */
        $value = $request->input('value');

        $message = $sendPrivateMessage->send(new PrivateMessageData(
            receiver_id: $contact->id,
            sender_id: $senderId,
            type: MessageType::text(),
            value: $value,
        ));

        return (new JsonResource($message))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updates(
        UpdatePrivateMessagesRequest $request,
        MarkPrivatesMessagesAsRead $markPrivatesMessagesAsRead,
    ): JsonResponse {
        $messages = $markPrivatesMessagesAsRead->markAsRead($request->privateMessagesWithMarkAsReadOperation());

        return JsonResource::collection($messages->items())->response();
    }
}
