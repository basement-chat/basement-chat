<?php

namespace Haemanthus\Basement\Http\Controllers\Api;

use Haemanthus\Basement\Contracts\AllContacts;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param \Haemanthus\Basement\Contracts\AllContacts $allContacts
     */
    public function __construct(
        protected AllContacts $allContacts,
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\ResourceCollection
     */
    public function index(): ResourceCollection
    {
        /** @var \Illuminate\Foundation\Auth\User&\Haemanthus\Basement\Contracts\User $user */
        $user = Auth::user();
        $contacts = $this->allContacts->all($user);

        return JsonResource::collection($contacts->items());
    }
}
