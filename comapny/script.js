
const storage = firebase.storage();
// Initialize Firebase with your project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZL5ajdJR_wnjrvWhIzxTfCP56MQXf0KI",
    authDomain: "ivpbs-f2ca0.firebaseapp.com",
    databaseURL: "https://ivpbs-f2ca0-default-rtdb.firebaseio.com",
    projectId: "ivpbs-f2ca0",
    storageBucket: "ivpbs-f2ca0.appspot.com",
    messagingSenderId: "1049725030175",
    appId: "1:1049725030175:web:c9bbf54d8e6003060e6a2a",
    measurementId: "G-8PXXV5TNTR"
  };
  firebase.initializeApp();
//   const database = firebase.database();
  
  
  const companyForm = document.getElementById("companyForm");
  
  companyForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Get form data
    const companyName = document.getElementById("companyName").value;
    console.log(companyName);
    const location = document.getElementById("location").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const companyImage = document.getElementById("photo").files[0];
  
    // Validate data (optional)
    // ... add validation logic if needed
  
    // Upload image to Firebase Storage
    if (companyImage) {
      const storageRef = storage.ref('company-images/' + companyName);
      const uploadTask = storageRef.put(companyImage);
  
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress + '%');
          // Display progress to user if needed
        },
        (error) => {
          // Handle upload errors
          console.error('Upload error:', error);
          alert('Image upload failed. Please try again.');
        },
        () => {
          // Get the download URL after successful upload
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Store company data in Firebase Realtime Database
            storeCompanyData(downloadURL);
          });
        }
      );
    } else {
      // Store company data without image
      storeCompanyData();
    }
  });
  
  function storeCompanyData(downloadURL) {
    const companyData = {
      company_name: companyName,
      location: location,
      phone_number: phoneNumber,  // Use consistent naming for clarity
      email: email,
      company_image_url: downloadURL || ""  // Set to empty string if no image
    };
  
    database.ref('companies').push(companyData).then(() => {
      console.log("Company details added to Firebase:", companyData);
      // Clear the form or display a success message
    });
  }

