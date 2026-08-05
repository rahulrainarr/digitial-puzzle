BRIGHTSTEPS PUZZLE TIME - ANDROID / SAMSUNG
===========================================

This Android project wraps the offline BrightSteps puzzle app in a minimal
Android WebView shell. The application requests no internet permission and
loads only bundled local HTML, JavaScript, and CSS files.

LEARNING FEATURES
-----------------
- Sixteen puzzle and learning activity types
- Shape Sorter, Bridges, Loopy, Suguru, and Fillomino include 50 generated
  variants per difficulty tier
- Suggested next activities based on responses stored locally on the phone
- Activity rotation to support variety and avoid repeated drilling
- Optional gradual automatic difficulty adjustment with caregiver control
- Non-clinical progress suggestions only: the app does not diagnose or assess
  autism, development, or medical needs

INSTALLABLE FILE
----------------
After a successful build, install:
  app\build\outputs\apk\debug\app-debug.apk

On a Samsung phone, open the APK and allow installation from the file manager
only when Android asks. Keep Google Play Protect enabled.

SECURITY DESIGN
---------------
- No internet permission
- No cleartext network traffic
- No file-system or content-provider access from WebView
- No navigation away from the bundled local app
- No advertising, analytics, login, or external scripts
- Child profile and progress remain local to the phone

BUILD
-----
This project uses Gradle and Android SDK 35:
  gradle assembleDebug

For Google Play publishing, create a release build signed with a protected
release key or use Play App Signing. Do not publish the debug APK.
