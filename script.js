<script>
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDOq-QUoAav6TV72BCGbSdCJjyb2pcuV_E",
            authDomain: "upload-video-cbc58.firebaseapp.com",
            projectId: "upload-video-cbc58",
            storageBucket: "upload-video-cbc58.appspot.com",
            messagingSenderId: "962019643419",
            appId: "1:962019643419:web:cefbebb66c573ae840e8be"
        };

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();

        document.getElementById('videoUpload').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const storageRef = storage.ref('videos/' + file.name);
                storageRef.put(file).then((snapshot) => {
                    snapshot.ref.getDownloadURL().then((url) => {
                        // Display the video
                        const videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.src = url;
                        videoPlayer.load();
                        videoPlayer.play();

                        // Display the video link
                        const videoLink = document.getElementById('videoLink');
                        videoLink.href = url;
                        videoLink.textContent = url;
                        document.getElementById('videoLinkContainer').style.display = 'block';
                    });
                }).catch((error) => {
                    console.error('Upload failed:', error);
                });
            }
        });
    </script>