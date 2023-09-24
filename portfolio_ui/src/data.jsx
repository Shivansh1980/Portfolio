import { GitHub, LinkedIn } from "@mui/icons-material";
export const shivanshResume = {
    name: "Shivansh Shrivastava",
    role: "Software Developer | Data Scientist",
    image: "https://th.bing.com/th/id/R.7ea4af7d8401d2b43ee841bfa2abe89d?rik=xidyUKdveUKULQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-download-icons-logos-emojis-users-2240.png&ehk=2%2bOqgdMZqFkKaBclc%2fPL9B86vLju3iBGiFmH64kXaTM%3d&risl=&pid=ImgRaw&r=0",
    bio: "I am Shivansh Shrivastava, a software developer with 2 years of experience in developing and maintaining web applications using various technologies such as C#, ASP.NET, Python, Django, React.js, and more. I have also worked on projects involving deep learning like image segmentation, image to story generator etc., Apart from it I am also skilled in ethical hacking, video editing, and bug hunting.",
    skills: [
      {
        name:"Deep Learning (ANN, RNN, CNN and RBMs)",
        percentage:70,
        years:1.5
      },
      {
        name:"Natural Language Processing (NLP)",
        percentage:60,
        years:1
      },
      {
        name:"LLMs, LangChains, Transformers",
        percentage:60,
        years:1
      },
      {
        name:"OOP with Python and C++",
        percentage:90,
        years:1
      },
      {
        name:"C#, ASP.NET Web API & MVC",
        percentage:70,
        years:1
      },
      {
        name:"Data Structures and Algorithms using C++",
        percentage:80,
        years:1
      },
      {
        name:"HTML, CSS, JavaScript, React.js with Redux tool kit",
        percentage:90,
        years:1
      },
      {
        name:"MySQL",
        percentage:55,
        years:1
      },
      {
        name:"Django, DRF and Django Channels",
        percentage:85,
        years:1
      },
      {
        name:"Computer Networking",
        percentage:80,
        years:1,
      }
    ],
    workExperience: [
      {
        company: "Persistent Systems",
        companyLogo:"persistent_systems_logo.jpg",
        location: "Pune, Maharashtra",
        role: "Software Developer",
        duration: "01/2022-Present",
        achievements: [
          "Designed and Developed application codes using ASP.NET, Entity Framework",
          "Developed REST based web Services as API using Asp.net Core Web AP and Microsoft SQL Server for the Database.",
          "React + Redux, Delivered optimized & scalable end-to-end application.",
        ],
      },
      {
        company: "MIBI",
        location: "",
        companyLogo:"mibi_logo.png",
        role: "Backend Django Developer",
        duration: "07/2021 -09/2021",
        achievements: [
          "Developed REST API using Django of career website for React Native Android and React based website.",
          "Workers can apply for jobs through android app while recruiter can post job through website and recruit worker.",
          "Also, I have hosted this complete website on AWS EC2 instance with S3 bucket as storage and RDS as database by linking them with Django.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Technology - Madhav Institute of Technology and Science (Information Technology)",
        duration: "2018-2022",
        score: "CGPA: 8.58/10",
      },
      {
        degree: "Senior Secondary (XII) Kendriya Vidyalaya (CBSE Board)",
        duration: "2017",
        score: "Percentage: 78.40%",
      },
      {
        degree: "Secondary (X) Wilson Public School (MP Board)",
        duration: "2015",
        score: "Percentage: 82.00%",
      },
    ],
    achievements: [
      "I got 2nd Rank during my internship @persistent systems.",
      "Solved 200+ leetcode problems",
      "Certification of Computation using Python @NPTEL",
      "Certified Django Mentor",
      "Internshala Ethical Hacking Training",
      "Python Training @Numeric Infosystem Pvt Ltd",
    ],
    projects: [
      {
        name: "Customer Segmentation",
        description:"Segmented a large dataset of customer by cleaning, filtering, and processing it. Used machine learning algorithm K-Means for segmenting and deployed the trained model on the server.",
        skills:["Machine Learning", "Tensorflow", "Django"],
        image:"customer_segmentation.jpg"
      },
      {
        name: "Stock Prediction Using LSTM Recurrent Neural Network",
        description:
          "Predicted the stock market prices of Google stock using recurrent neural network (RNN) using python’s Tensorflow.",
        skills: ["Python", "Tensorflow", "Numpy", "Pandas"],
        image: "stock_market_prediction.jpg"
      },
      {
        name: "Doubt Solving Chatroom (Django + React.js+ Redis)",
        description:
          "It uses machine learning to perform advanced image manipulation and creates message threads to append solution of doubt. It has other features like Image and File Upload on chat, editing Image during upload and many more.",
        skills: ["Django", "React.js", "Redis", "Machine Learning"],
        image:"chatroom.jpg",
      },
      {
        name: "Trainer’s Calendar (React.js+ ASP.NET)",
        description:
          "This application allows trainers to manage & schedule sessions.The sessions will be displayed in calendar just like google, outlook or teams.",
        skills: ["React.js", "ASP.NET", "Microsoft Graph API"],
        image:"trainer_calendar.png",
      },
      {
        name: "Encryptor API (Django + DRF + HTML+ CSS + JavaScript)",
        description:
          "This API encrypts any kind of files, messages with the private key cryptography and user can download that file along with the key using the API through which file was locked. In this way user can secure their files.",
        skills: ["Django", "DRF", "HTML", "CSS", "JavaScript"],
        image:"encryptor_api.jpg",
      },
      {
        name: "Image Encoder Decoder and Denoiser",
        description:
          "Developed a dimensionality reduction and image compression model using sparse autoencoders (DL), resulting in improved encoding and decoding of images for machine learning applications.",
        skills: ["Deep Learning", "Sparse Auto-Encoders"],
        image: "image_encoder_decoder.jpg",
      },
    ],
    aimodels:[
      {
        name: "Image To Story Teller",
        description: "This model uses large language model that generates captions for images and then it uses gpt model to create story from that caption and the generated story converted to audio using text to speach model",
        skills: ["Deep Learning", "LLM", "GPT", "Computer Vision", "Transformers", "LangChain", "NLP"],
        image: "image_to_story.jpg"
      },
      {
        name:"Image Segmentation",
        description:"This model segments the images into different classes of any type, its like a segment anything model which then seperates out the segmented image and shows the seperate image of each segment",
        skills:["Deep Learning", "LLM", "Computer Vision"],
        image:"image_segmentation.jpg"
      }
    ],
    hobbies: [
      "Video Editing (After Effects, Blender, Premiere Pro)",
      "Ethical Hacking (Penetration Testing on Kali Linux)",
      "Cricket, Gym",
      "Bug Hunting",
    ],
    socialLinks: [
      {
        name: "GitHub",
        icon: <GitHub />,
        url: "https://github.com/shivansh1980",
      },
      {
        name: "LinkedIn",
        icon: <LinkedIn />,
        url: "https://www.linkedin.com/in/shivansh-shrivastava-995b67146/",
      },
    ],
};
  