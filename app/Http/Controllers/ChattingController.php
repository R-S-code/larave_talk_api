<?php

namespace App\Http\Controllers;

use App\Models\Chatting;
use Illuminate\Http\Request;

class ChattingController extends Controller
{
    // ページ読み込み時チャットデータを表示
    public function syncGetChatting() {
        $chatting_model = new Chatting();
        $chattings = $chatting_model->getChattings();
        return view('chatting', ['chattings' => $chattings]);
    }

    // データベースからデータ取得
    public function getChatting() {
        $chatting_model = new Chatting();
        $chattings = $chatting_model->getChattings();
        return ['chattings' => $chattings];
    }

    // データ登録
    public function insertChatting(Request $request) {
        $chatting_model = new Chatting();
        $chattings = $chatting_model->insertChattings($request);
        return ['chattings' => $chattings];
    }


    // チャットリセット
    public function resetChatting() {
        $chatting_model = new Chatting();
        $chatting_model->resetChattings();
    }
}
