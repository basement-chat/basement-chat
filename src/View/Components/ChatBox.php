<?php

declare(strict_types=1);

namespace BasementChat\Basement\View\Components;

use BasementChat\Basement\Facades\Basement;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\View\Component;

class ChatBox extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->authenticateOrFail();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View
    {
        /** @var view-string $view */
        $view = 'basement::chat-box';

        return view($view, data: [
            'position' => Basement::getChatBoxWidgetPosition(),
            'echoOptions' => Basement::getBroadcastOptions(),
        ]);
    }

    /**
     * Make sure the package can only be used if the user is authenticated.
     *
     * @throws \Illuminate\Validation\UnauthorizedException
     */
    protected function authenticateOrFail(): void
    {
        if (Auth::check() === false) {
            throw new UnauthorizedException(
                'Please register this package only on the page where the user has successfully logged in.',
            );
        }
    }
}
