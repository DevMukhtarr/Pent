# Pent

Pent is a hypothetical platform where users can sign up with their basic information and post reviews about apartments they have previously lived in.

What Tenants can do:

 1. Give reviews about previous landlords
 2. Include optional Image or Video of previous apartments
 3. Include review about Environment Apartment is located
 4. Include review of quality of amenities of previous apartment

 What random visitors can do:
 
 1. View all reviews
 2. Rate reviews
 3. View reviews by Helpful ratings
 4. View reviews by most recent

 # Api Reference

## Getting Started
- Base Url: The Base Url of the project is live at  https://pent-api.herokuapp.com 
- Authentication: Authentication token will be available on sign in and sign up of tenant
- Environment Variables: a sample of environment variables is available at ``` .env.example ``` file  

## Endpoints
> POST /signup

 General:
 - Registers as a user

> sample :  https://pent-api.herokuapp.com/signup 

request sample

```
{
    "firstname": "john",
    "lastname": "doe",
    "email": "johndoe@gmail.com",
    "password": "johndoe",
    "confirm_password": "johndoe"
}
```

response sample

```
{
    "status": true,
    "message": "New user created succesfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwMTc3ODRlNjgyMGE2OTAyNzJkZTUzIiwiZW1haWwiOiJtYW51ZWxoaWxsQGdtYWlsLmNvbSIsImlhdCI6MTY2MTA0MDUxNiwiZXhwIjoxNjYxMDQwNTE2fQ.GhiKTOOV1-Wu_RZ4GRi7gXzm33QKgJ0VVAdxmCs1K1E"
}

```

> POST /sigin

General:
 - signin as a user

 > sample : https://pent-api.herokuapp.com/signin 

 request sample

 ```
{
    "email": "johndoe@gmail.com",
    "password": "johndoe"
}

 ```

 response sample

 ```
{
    "status": true,
    "message": "user signed in succesfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwMTVlNGJmYjVmYjgzYzUyZjRlNWY5IiwiZW1haWwiOiJtYW51ZWxoaWxsQGdtYWlsLmNvbSIsImlhdCI6MTY2MTAzNjgzNCwiZXhwIjoxNjYxMDM3NDM0fQ.aOXfYCe0ehuKRyf_5OgNYh5cPRJDIedrDGsIit75Zxg"
}

 ```

 > POST /create-review

 General:
 - Create review of past apartments

 > sample : https://pent-api.herokuapp.com/create-review 

 request sample

 using ``` x-access-token ``` as key for header and the jwt you get in either signin or signup i.e.

 ```
 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwMTc3ODRlNjgyMGE2OTAyNzJkZTUzIiwiZW1haWwiOiJtYW51ZWxoaWxsQGdtYWlsLmNvbSIsImlhdCI6MTY2MTA3NTU0NCwiZXhwIjoxNjYxMDc2MTQ0fQ.Wv1qoSstleXpohYnktcWlx0_11YJUV5Yy_pgmTaTh64

 ```

```
{
    "landlord_review": "Calls tenants regularly to know if they are facing any difficulty",
    "environment_review": "very secure and neat",
    "quality_of_amenities": "high grade amenities",
    "image_or_video_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUmzSaycUnj_VqZim5Mn0horUbp1fiy6uPQ&usqp=CAU"
}

```

response sample

```
{
    "status": true,
    "message": "Review submitted successfully"
}

```

 > POST /visitor-rating
 General:
 - rate review as a visitor

 > sample : https://pent-api.herokuapp.com/visitor-rating 

 request sample

 ```
{
    "tenant_email": "johndoe@gmail.com",
    "helpful": "true"
}

 ```
response sample

```
{
    "status": true,
    "message": "Rating sent successfully"
}

```

> get /view-all-reviews

General:
 - Gets all reviews available

 > sample : https://pent-api.herokuapp.com/view-all-reviews 

response sample

 ```
 {
    "status": true,
    "message": "all reviews",
    "all_reviews": [
        {
            "name": "john",
            "email": "johndoe@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Checks all faulty utilities and fixes immediately",
                    "environment": "clean and quiet",
                    "quality_of_amenities": "high grade amenities",
                    "image_or_video_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUmzSaycUnj_VqZim5Mn0horUbp1fiy6uPQ&usqp=CAU"
                },
                {
                    "landlord": "calls tenants regularly to stay updated on all issues",
                    "environment": "clean, quiet and highly secured",
                    "quality_of_amenities": "state of art",
                    "image_or_video_link": "https://images.app.goo.gl/cNUURxJu1iQJwND76"
                }
            ]
        },
        {
            "name": "manuel",
            "email": "manuelhill@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Shows up once in a while to check all facilities",
                    "environment": "neat and higly secured",
                    "quality_of_amenities": "All amenities are not faulty",
                    "image_or_video_link": "https://images.app.goo.gl/5YdVX1hv67NfeDTv8"
                }
            ]
        }
    ]
}

 ```

> get /view-reviews-by-helpful

General:
 - Get reviews by Helpful rating from visitors

>sample:  https://pent-api.herokuapp.com/view-reviews-by-helpful  

response sample

```
{
    "status": true,
    "message": "all reviews",
    "all_reviews": [
        {
            "name": "john",
            "email": "johndoe@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Checks all faulty utilities and fixes immediately",
                    "environment": "clean and quiet",
                    "quality_of_amenities": "high grade amenities",
                    "image_or_video_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUmzSaycUnj_VqZim5Mn0horUbp1fiy6uPQ&usqp=CAU"
                },
                {
                    "landlord": "calls tenants regularly to stay updated on all issues",
                    "environment": "clean, quiet and highly secured",
                    "quality_of_amenities": "state of art",
                    "image_or_video_link": "https://images.app.goo.gl/cNUURxJu1iQJwND76"
                }
            ]
        },
        {
            "name": "manuel",
            "email": "manuelhill@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Shows up once in a while to check all facilities",
                    "environment": "neat and higly secured",
                    "quality_of_amenities": "All amenities are not faulty",
                    "image_or_video_link": "https://images.app.goo.gl/5YdVX1hv67NfeDTv8"
                }
            ]
        }
    ]
}

```

> get /view-reviews-by-recent

General:
 - Get reviews by most recent

>sample: https://pent-api.herokuapp.com/view-reviews-by-recent 

response sample

```
{
    "status": true,
    "message": "all reviews by most recent",
    "all_reviews": [
        {
            "name": "manuel",
            "email": "manuelhill@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Shows up once in a while to check all facilities",
                    "environment": "neat and higly secured",
                    "quality_of_amenities": "All amenities are not faulty",
                    "image_or_video_link": "https://images.app.goo.gl/5YdVX1hv67NfeDTv8"
                }
            ]
        },
        {
            "name": "john",
            "email": "johndoe@gmail.com",
            "previous_apartments": [
                {
                    "landlord": "Checks all faulty utilities and fixes immediately",
                    "environment": "clean and quiet",
                    "quality_of_amenities": "high grade amenities",
                    "image_or_video_link": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaUmzSaycUnj_VqZim5Mn0horUbp1fiy6uPQ&usqp=CAU"
                },
                {
                    "landlord": "calls tenants regularly to stay updated on all issues",
                    "environment": "clean, quiet and highly secured",
                    "quality_of_amenities": "state of art",
                    "image_or_video_link": "https://images.app.goo.gl/cNUURxJu1iQJwND76"
                }
            ]
        }
    ]
}

```
