# Newsletter &middot; ![Runtime: NodeJs](https://img.shields.io/badge/Node_JS-5FA04E?logo=nodedotjs&logoColor=ffffff) ![Language: Javascript](https://img.shields.io/badge/Javascript-F7DF1E?logo=javascript&logoColor=000000) ![Framework: Nuxt](https://img.shields.io/badge/Nuxt-00DC82?logo=nuxtdotjs&logoColor=ffffff)

[**Leia em Português**](README.md)

## 🔗 Table of Contents

1. [The Study](#-the-study)
2. [Technologies](#-technologies)
3. [Project Structure](#%EF%B8%8F-project-structure)
4. [Styling](#-styling)
5. [Getting Started](#-getting-started)
6. [Pages](#-pages)
7. [License](#license)

## 📙 The Study

> The Newsletter application was developed alongside [**its API**](https://github.com/vinicioscst/newsletter-api) to strengthen knowledge of JavaScript/TypeScript and learn new technologies such as **Vue** and **Gemini**, Google's artificial intelligence. Additionally, it served as a starting point for other concepts such as OOP and Design Patterns, specifically the Singleton design pattern used in the instances of the ORM and the Cron tool (both in the API).

## 💻 Technologies

- **Language** - JavaScript
- **Framework** - [Nuxt 2](https://v2.nuxt.com/)
- **Runtime** [^1] - [Node.JS](https://nodejs.org)

> [^1]: Version 14.x or 16.x is recommended.

## 🗂️ Project Structure

```bash
📦 root
├── 📁 components       # Contains the application components
├── 📁 layouts          # Contains the page templates used in routes
├── 📁 middleware       # Contains the configuration for user authentication middlewares
├── 📁 pages            # Contains the routing configurations of the application
├── 📁 plugins          # Contains the configurations for additional plugins
├── 📁 store            # Contains the stores with the application's global states and methods for data manipulation
```

## 💡 Styling

To style the application, the **Vuetify** library was used, which is based on Google's Material Design. Almost all elements of the application are derived from pre-existing Vuetify components, including their styles and other aspects like accessibility.

## 🚀 Getting Started

```bash
# Clone the project

git clone https://github.com/vinicioscst/newsletter-vue.git

# Install dependencies

npm install

# Create the .env file and fill in the correct data

BASE_URL=            # Insert your API URL here. Example: http://localhost:3000

# Run the application

npm run dev
```

> [!WARNING]
> To access and manage the news, remember to create a user [**via the API**](https://github.com/vinicioscst/newsletter-api).

## 🔗 Pages

```bash
├── 🔗 /                         # Home page, where the most recent news is displayed.
│                                # You can search for news by title or topic, and sort by date or alphabetical order.
├── 🔗 /articles                 # Typically accessed after a search, filtering news through query params.
├── 🔗 /login                    # Contains the form for the admin user login.
├── 🔗 /admin                    # User dashboard where you can create, view, edit, and delete news articles.
│   ├── 🔗 /admin/settings       # User settings, allowing changes to name, email, and/or password.
```

## License

This project is under the [MIT license](LICENSE).
