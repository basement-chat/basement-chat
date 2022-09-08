<?php

use App\Models\User;
use BasementChat\Basement\Enums\MessageType;
use BasementChat\Basement\Facades\Basement;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('private_messages', function (Blueprint $table): void {
            Basement::useUserModel(config(key: 'basement.user_model', default: User::class));

            $user = Basement::newUserModel();

            $table->id();
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('sender_id');
            $table->foreign('receiver_id')->references('id')->on($user->getTable());
            $table->foreign('sender_id')->references('id')->on($user->getTable());
            $table->enum('type', [MessageType::document()->value, MessageType::text()->value]);
            $table->string('value');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('private_messages');
    }
};
