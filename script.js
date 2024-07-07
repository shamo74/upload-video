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
        const database = firebase.database();

        // مرجع لقاعدة البيانات
        const videosRef = database.ref('videos');

        // استرجاع البيانات من Firebase وعرضها
        videosRef.on('value', (snapshot) => {
            const videos = snapshot.val();
            const videoList = document.getElementById('videoList');

            videoList.innerHTML = ''; // تفريغ العناصر الحالية

            for (let key in videos) {
                const videoUrl = videos[key];
                const videoElement = document.createElement('div');
                videoElement.innerHTML = `
                    <h3>فيديو</h3>
                    <video controls>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                videoList.appendChild(videoElement);
            }
        });

    </script>
