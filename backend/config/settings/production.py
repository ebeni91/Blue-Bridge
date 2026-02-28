from .base import *

# Override base settings for production security
DEBUG = False

# Rate limiting to stop brute-force attacks
REST_FRAMEWORK['DEFAULT_THROTTLE_CLASSES'] = [
    'rest_framework.throttling.AnonRateThrottle',
    'rest_framework.throttling.UserRateThrottle'
]
REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {
    'anon': '10/min',   
    'user': '1000/day'  
}