<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatting extends Model
{
    protected $table = 'chattings';
    protected $fillable = ['id', 'chatting_content', 'robot_flg'];
    protected $guarded = array('id');
    public $timestamps = false;

    public function getChattings()
    {
        $chattings = Chatting::get(['id', 'robot_flg', 'chatting_content']);
        return $chattings;
    }

    public function insertChattings($chat)
    {
        Chatting::create([
            'chatting_content' => $chat->sending_content,
            'robot_flg' => $chat->robot_flg,
        ]);
        $chattings = Chatting::orderBy('id', 'desc')->first();
        return $chattings;
    }

    public function resetChattings()
    {
        Chatting::query()->delete();
    }
}
