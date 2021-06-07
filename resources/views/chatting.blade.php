<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>TALKING ROBOT</title>
    {{-- css読み込み --}}
    <link rel="stylesheet" href="{{ asset('css/reset.css') }}">
    <link rel="stylesheet" href="{{ asset('css/chatting.css') }}">
    {{-- jQquery読み込み --}}
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
</head>
<body>
    {{-- ヘッダー --}}
    <header class="header">
        <h1 class="header__title"><img src="{{ asset('img/title.png') }}" alt="TALKING ROBOT"></h1>
        <p class="header__robot-icon"><img src="{{ asset('img/title_robot_icon.png') }}" alt="robot icon"></p>
    </header>

    <main>
        {{-- チャット表示画面 --}}
        <div class="chatting-field" id="chatting-field">
            <button class="chatting-field__reset-btn" id="chatting-field__reset-btn">Reset</button>
            <div class="chatting-field__search">
                <input type="text" id="chatting-field__search-input">
                <p class="chatting-field__search-divide">|</p>
                <p class="chatting-field__search-result-num" id="chatting-field__serach-result-num">0/0</p>
                <button class="chatting-field__search-btn-up" id="chatting-field__search-btn-up"><img src="{{ asset('img/arrow_up.svg') }}" alt="⇧"></button>
                <button class="chatting-field__search-btn-down" id="chatting-field__search-btn-down"><img src="{{ asset('img/arrow_down.svg') }}" alt="⇩"></button>
            </div>
            <div class="chatting-field__chatting-place" id="chatting-field__chatting-place">
                {{-- ページ読み込み時チャット表示 --}}
                @foreach($chattings as $chatting)
                    @if ($chatting->robot_flg == 0)
                        <div class="chatting-field__user-chat">
                            <p class="chatting-field__user-chat-content chatting-field__chat-content" id="{{ $chatting->id}}">{{ $chatting->chatting_content }}</p>
                            <p class="chatting-field__user-chat-icon">
                                <img src="/img/user_icon.svg" alt="user icon">
                            </p>
                        </div>
                    @else
                        <div class="chatting-field__robot-chat">
                            <p class="chatting-field__robot-chat-icon ">
                                <img src="/img/robot_icon.svg" alt="robot icon">
                            </p>
                            <p class="chatting-field__robot-chat-content chatting-field__chat-content" id="{{ $chatting->id}}">{{ $chatting->chatting_content }}</p>
                        </div>
                    @endif
                @endforeach
            </div>
        </div>

        <div class="sending-field">
            <p class="sending-field__input-chat"><input id="sending-field__input-chat" maxlength="40"></p>
            <button class="sending-field__send-btn" id="sending-field__send-btn">送信</button>
            <button class="sending-field__microphone" id="sending-field__microphone"><img src="{{ asset('img/microphone_icon.svg') }}" alt="マイク"></button>
        </div>
    </main>

    <footer class="footer">
        <p class="footer__logo"><img src="{{ asset('img/adglobe_icon.svg') }}" alt="adglobe"></p>
    </footer>

    <script src="{{ asset('js/chatting.js') }}"></script>
</body>
</html>
