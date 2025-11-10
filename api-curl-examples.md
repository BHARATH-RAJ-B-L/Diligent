## cURL Examples

Assuming backend at `http://localhost:5000`.

### Health
```bash
curl http://localhost:5000/api/health
```

### List products
```bash
curl "http://localhost:5000/api/products?q=tee&category=Apparel&minPrice=10&maxPrice=50&page=1&limit=12"
```

### Product details
```bash
curl http://localhost:5000/api/products/<productId>
```

### Register
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

### Me (requires token)
```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <token>"
```

### Create Order (requires token)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "items":[{"productId":"<productId>","qty":2}],
    "shippingAddress":{
      "fullName":"John Doe",
      "addressLine1":"123 Main St",
      "addressLine2":"Apt 4",
      "city":"NYC",
      "state":"NY",
      "postalCode":"10001",
      "country":"USA"
    }
  }'
```

### Seed products
```bash
curl -X POST http://localhost:5000/api/seed/products
```


