# DevTinder API's
 
## authRouter
- POST /signup
- POST /login
- POST /logout

##  profileRouter
- GET /profile/view
- PATCH /profile/update
- PATCH /profile/password

##  connectionRequest Router
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

##  userRouter
- GET /user/connections
- GET /user/requests/received/:requestId
- GET /user/feed  - GEts you the profiles of other users on platform

# STATUS: Ignore, Interested, Accepted, Rejected