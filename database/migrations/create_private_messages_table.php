<?php

declare(strict_types=1);

use BasementChat\Basement\Enums\MessageType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('private_messages', static function (Blueprint $table): void {
            /** @var string $model */
            $model = config('basement.user_model');
            /** @var \Illuminate\Database\Eloquent\Model $user */
            $user = app($model);

            $primaryKey = $user->getKeyName();
            $tableName = $user->getTable();

            $table->id();
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('sender_id');
            $table->foreign('receiver_id')->references($primaryKey)->on($tableName);
            $table->foreign('sender_id')->references($primaryKey)->on($tableName);
            $table->enum('type', [MessageType::document()->value, MessageType::text()->value]);
            $table->string('value');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('private_messages');
    }
};
