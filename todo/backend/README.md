## 以下の操作を実行してください

### composer を使用して一括でインストール

```
  composer i
```

### jwt-auth を有効化

```
  php artisan key:generate
  php artisan jwt:secret
  php artisan cache:clear
  php artisan config:clear
```
