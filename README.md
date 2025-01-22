# Expo Camera State Access After Unmount

This repository demonstrates a bug and its solution related to accessing the Expo Camera API's internal state after the component using the Camera has unmounted.  Accessing properties like `isRecording` or `isTakingPhoto` after the component is gone throws a `TypeError`. 

The `bug.js` file showcases the issue, while `bugSolution.js` provides a fix.

## Bug
The primary issue is that internal camera state is accessed within a function even after the component has been unmounted, leading to an undefined state.  This is a common error when asynchronous operations are involved and the component lifecycle is not properly managed.  

## Solution
The solution involves using a ref to track the component's mounted status and ensuring that access to the camera state happens only when the component is mounted.   This avoids attempting to access the camera's state after cleanup. 