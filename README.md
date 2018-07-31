# water-detector-server
A server which send email when the water detector is offline or when water has been detected.

Availible locales: `fr`, `en`

## Installation

```bash
git clone https://github.com/cedced19/water-detector-server
cd water-detector-server
npm start
```

## Configuration

You will have to create a `.env` file to configurate the mail service:
```dosini
MAIL_SERVICE=gmail
MAIL_AUTH_USER=example@gmail.com
MAIL_AUTH_PASS=password
LOCALE=fr
RECEIVERS=receiver@example.com,receiver2@example.com
```
You can use a lot of service as described [there](http://nodemailer.com/smtp/well-known/).
I use another GMail account to send me the data each week.