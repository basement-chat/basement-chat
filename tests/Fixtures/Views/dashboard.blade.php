<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

  <!-- Styles -->
  <link rel="stylesheet" href="{{ asset('vendor/basement/basement.bundle.min.css') }}">
</head>
<body>
  <x-basement::chat-box />

  {{ auth()->user()->toJson() }}

  <!-- Scripts -->
  <script src="{{ asset('vendor/basement/basement.bundle.min.js') }}"></script>
</body>
</html>
