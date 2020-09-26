## Дипломная работа: Сервис для поиска новостей.

Содержит backend,сервиса для поиска и сохранения новостей.

![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/Irina-prog/news-backend)
![GitHub open issues](https://img.shields.io/github/issues-raw/Irina-prog/news-backend)
![GitHub stars](https://img.shields.io/github/stars/Irina-prog/news-backend?style=social)



Используемые технологии: npm, express, mongoose, mongo db, jwt, helmet, winston, joi, celebrate.


### Установка

Убедитесь, что Mongo DB установлен и запущен на локальном компьютере.
Выполните после извлечения из git следующую команду `npm install`

Установите следующие переменные окружения (можете сделать это в файле .env):

`JWT_SECRET` - секрет для создания и проверки токена JWT (случайный набор символов и букв),

`DATABASE_URL` - url для БД (по умолчанию: mongodb://localhost/news),

`PORT` - порт который будет слушать приложение (по умолчанию: 3000) 

`MIN_PASSWORD_LENGTH` - минимальная длина пароля (по умолчанию: 6 символов)

Для запуска сервера  выполните `npm start`.
Для запуска сервера с поддержкой hot reload выполните `npm run dev`.

### Развертывание на сервере

Установите на сервере mongodb или используйте настроенный раннее сервер mongod. 

Подключитесь к удалённой машине, установите на ней node js и выполните в терминале:

```sh
git clone https://github.com/Irina-prog/news-backend

cd news-backend

npm install
```

Создайте в этом каталоге файл `.env` со следующим содержимым

```
NODE_ENV=production
JWT_SECRET=<случайный набор символов>
DATABASE_URL=<url на установленный экземпляр mongodb>
PORT=<порт который будет слушать приложение>
MIN_PASSWORD_LENGTH=<минимальная длина пароля>
```

Установите `pm2` командой `sudo npm install pm2 -g` и запустите приложение командой `pm2 start app.js`
Для того, чтобы `pm2` запускал приложение после перезагрузки выполните
```sh
pm2 startup

# Затем выполните команду, которую покажет вывод  pm2 startup

pm2 save
```

При необходимости настройте reverse proxy, https, firewall.


### Для ревьювера

Вы можете потестировать приложение на `news.students.nomoreparties.co` (ip 84.201.133.71)

Доступ к API возможен по путям:

1. `http://84.201.133.71:3000`
1. `http://news.students.nomoreparties.co:3000`
1. `https://news.students.nomoreparties.co`

Запрос на `http://news.students.nomoreparties.co` будет перенаправлен на `https://news.students.nomoreparties.co` сервером nginx

Публикуйте ваши замечания [здесь](https://github.com/Irina-prog/news-backend/issues).



