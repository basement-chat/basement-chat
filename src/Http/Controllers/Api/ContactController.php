<?php

declare(strict_types=1);

namespace BasementChat\Basement\Http\Controllers\Api;

use BasementChat\Basement\Contracts\AllContacts;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(AllContacts $allContacts): JsonResponse
    {
        /** @var \Illuminate\Foundation\Auth\User&\BasementChat\Basement\Contracts\User $user */
        $user = Auth::user();
        $contacts = $allContacts->all($user);

        return JsonResource::collection($contacts->values())->response();
    }
}
