# NewsHighlights

It's a simple website to view news highlights from different websites, users can also read more about the news if they want to without leaving the site.

## Screenshots

![App Screenshot](screenshots/ss1.png?raw=true)

![App Screenshot](screenshots/ss3.png?raw=true)

![App Screenshot](screenshots/ss4.png?raw=true)

## Features

-   Read more about news: User can read more about the news if they want to.
-   News Highlights: User will see highlights from different well known news sites in one place.
-   Simple UI: Design is very simple and modern, anyone can use it with ease. Also it has a responsive design be it mobile, tablet or desktop user can use it anywhere with ease.

## Live Website

https://newshighlights.netlify.app/

## Setup to run it locally

Run the project locally

The website should be running on 'http://localhost:5173/'

```bash
  git clone https://github.com/Smiky0/NewsHighlights.git
  cd .\newshighlights\
  npm install
  npm run dev
```

Create .env file in root directory

## Docker Image
To run it as docker image, visit: https://hub.docker.com/repository/docker/soumik10/news_webapp

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (get them from NewsAPI)
NewsAPI Website: https://newsapi.org/register

`VITE_API_KEY`

## Contributing

Contributions are always welcome!

    1. Fork the repository
    2. Create a new branch (git checkout -b feature/your-feature)
    3. Make your changes
    4. Commit your changes (git commit -m 'Add some feature')
    5. Push to the branch (git push origin feature/your-feature)
    6. Create a new Pull Request

## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
