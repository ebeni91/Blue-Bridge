# Add this to your production.py settings to stop brute-force attacks
REST_FRAMEWORK['DEFAULT_THROTTLE_CLASSES'] = [
    'rest_framework.throttling.AnonRateThrottle',
    'rest_framework.throttling.UserRateThrottle'
]
REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'] = {
    'anon': '10/min',   # Unauthenticated users (e.g., requesting OTPs) max 10 requests per minute
    'user': '1000/day'  # Authenticated users max 1000 per day
}