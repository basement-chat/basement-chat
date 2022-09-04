<?php

namespace Haemanthus\Basement\Http\Controllers\Api;

use Haemanthus\Basement\Contracts\AllContacts;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param \Haemanthus\Basement\Contracts\AllContacts $allContacts
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(AllContacts $allContacts): JsonResponse
    {
        /** @var \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $user */
        $user = Auth::user();
        $contacts = $allContacts->all($user);

        return JsonResource::collection($contacts->items())->response();
    }
}
