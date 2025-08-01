# How to Contribute to AprenMaker-Hub

Welcome to the AprenMaker-Hub contribution guide! I'm excited that you're interested in helping make this project even better.

## Why Your Contribution Matters

!!! info "Every Contribution Counts"
    AprenMaker-Hub is a community-driven project that thrives on diverse contributions. Whether you're a seasoned developer, a design enthusiast, an educator, or someone passionate about maker education, there's a place for you here!

### Ways You Can Contribute

=== "Content Creation"

    - **Educational Resources**: Share tutorials, lesson plans, or educational content
    - **Documentation**: Help improve existing guides or create new ones
    - **Translations**: Make the project accessible to more communities
    - **Case Studies**: Document real-world applications and success stories

=== "Technical Improvements"

    - **New Features**: Propose and implement exciting new functionality
    - **Bug Fixes**: Help identify and resolve issues
    - **Code Optimization**: Improve performance and maintainability
    - **Testing**: Help ensure everything works reliably

=== "Design & UX"

    - **Visual Design**: Improve the overall look and feel
    - **User Experience**: Enhance navigation and usability
    - **Graphics & Icons**: Create compelling visual elements
    - **Accessibility**: Make the site more inclusive

=== "Community Support"

    - **Mentoring**: Help guide new contributors
    - **Content Review**: Review and provide feedback on submissions
    - **Outreach**: Help spread the word about the project
    - **Event Organization**: Organize workshops or meetups

!!! tip "Not a Coder? No Problem!"
    Some of the most valuable contributions could come from non-developers. Content creators, educators, designers, and community organizers are all essential to making AprenMaker-Hub a success.

---

## Setting Up Your Development Environment (macOS)

Follow this step-by-step guide to get your local development environment ready for contributing.

### Prerequisites

!!! warning "Required Software"
    Before starting, make sure you have the following installed:
    - **Git** (for version control)
    - **Python 3.8+** (for running MkDocs)
    - **A text editor** (VS Code, Sublime Text, or your preferred editor)

### Step 1: Install Git and Python

=== "Using Homebrew (Recommended)"

    First, install Homebrew if you haven't already:
    
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    
    Then install Git and Python:
    
    ```bash
    brew install git python
    ```

=== "Manual Installation"

    1. **Git**: Download from [git-scm.com](https://git-scm.com/download/mac)
    2. **Python**: Download from [python.org](https://www.python.org/downloads/macos/)

Verify your installations:

```bash
git --version
python3 --version
pip3 --version
```

### Step 2: Fork and Clone the Repository

!!! info "What is Forking?"
    Forking creates your own copy of the repository on GitHub where you can make changes without affecting the original project.

1. **Fork the repository** on GitHub:
   - Go to [https://github.com/jmuozan/AprenMaker-Hub](https://github.com/jmuozan/AprenMaker-Hub)
   - Click the "Fork" button in the top-right corner

2. **Clone your fork locally**:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git clone https://github.com/YOUR_USERNAME/AprenMaker-Hub.git
cd AprenMaker-Hub
```

3. **Add the original repository as upstream**:

```bash
git remote add upstream https://github.com/jmuozan/AprenMaker-Hub.git
```

### Step 3: Set Up Python Environment

!!! tip "Virtual Environments"
    Using a virtual environment keeps your project dependencies isolated from your system Python installation.

1. **Create a virtual environment**:

```bash
python3 -m venv mkdocs-env
```

2. **Activate the virtual environment**:

```bash
source mkdocs-env/bin/activate
```

!!! note "Activation Indicator"
    When activated, you should see `(mkdocs-env)` at the beginning of your terminal prompt.

3. **Install project dependencies**:

```bash
pip install -r requirements.txt
```

If there's no `requirements.txt` file, install MkDocs and its dependencies manually:

```bash
pip install mkdocs mkdocs-material mkdocs-macros-plugin
```

### Step 4: Test Your Setup

!!! success "Verify Everything Works"
    Let's make sure your development environment is working correctly.

1. **Start the development server**:

```bash
mkdocs serve
```

2. **Open your browser** and navigate to `http://127.0.0.1:8000`

You should see the AprenMaker-Hub website running locally!

!!! tip "Development Server Features"
    The development server automatically reloads when you make changes to files, making development much faster.

---

## Making Your First Contribution

### Step 5: Create a New Branch

!!! important "Branch Naming Convention"
    Use descriptive branch names like `add-tutorial-3d-printing` or `fix-navigation-bug`.

```bash
# Make sure you're on the main branch
git checkout main

# Pull the latest changes
git pull upstream main

# Create and switch to a new branch
git checkout -b your-feature-branch-name
```

### Step 6: Make Your Changes

Now you can start making your contributions! Here are some common scenarios:

=== "Adding Content"

    1. **Create new markdown files** in the appropriate directory
    2. **Update `mkdocs.yml`** to include your new pages in the navigation
    3. **Add any images or assets** to the `assets/` directory
    
    Example structure:
    ```
    docs/
    ├── tutorials/
    │   └── your-new-tutorial.md
    └── assets/
        └── images/
            └── tutorial-images/
    ```

=== "Modifying Existing Content"

    1. **Find the relevant `.md` file** in the `docs/` directory
    2. **Make your changes** using Markdown syntax
    3. **Preview your changes** using `mkdocs serve`

=== "Adding a Contributor Profile"

    1. **Create your profile file**:
    ```bash
    touch docs/About/contributors/your-name.md
    ```
    
    2. **Add your information** using this template:
    ```yaml
    ---
    name: "Your Name"
    role: "Your Role/Title"
    feature_img: "/assets/contributors_pictures/Profile_YourName.jpg"
    socials:
      linkedin: "https://linkedin.com/in/yourprofile"
      github: "https://github.com/yourusername"
      website: "https://yourwebsite.com"
      email: "your.email@example.com"
    ---
    
    Write a brief bio about yourself, your interests, and how you contribute to the maker community.
    ```

### Step 7: Test Your Changes

!!! warning "Always Test Before Submitting"
    Make sure your changes work correctly and don't break anything.

```bash
# Start the development server
mkdocs serve

# Check for any errors in the terminal
# Verify your changes look correct in the browser
```

Common things to check:
- [ ] All links work correctly
- [ ] Images display properly
- [ ] Navigation is updated if you added new pages
- [ ] No syntax errors in Markdown
- [ ] Typography and formatting look good

### Step 8: Commit Your Changes

!!! tip "Writing Good Commit Messages"
    Use clear, descriptive commit messages that explain what you changed and why.

```bash
# Add your changes to staging
git add .

# Commit with a descriptive message
git commit -m "Add comprehensive tutorial on 3D printing basics

- Include step-by-step setup instructions
- Add troubleshooting section
- Include safety guidelines and best practices"
```

Good commit message format:
- **First line**: Brief summary (50 characters or less)
- **Blank line**
- **Detailed description**: Explain what and why, not how

### Step 9: Push and Create Pull Request

1. **Push your branch to your fork**:

```bash
git push origin your-feature-branch-name
```

2. **Create a Pull Request** on GitHub:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill out the PR template with details about your changes

!!! example "Pull Request Template"
    ```markdown
    ## Description
    Brief description of what this PR does.
    
    ## Type of Change
    - [ ] New content/tutorial
    - [ ] Bug fix
    - [ ] New feature
    - [ ] Documentation update
    - [ ] Design improvement
    
    ## Screenshots (if applicable)
    Add screenshots to help explain your changes.
    
    ## Testing
    - [ ] I have tested these changes locally
    - [ ] All links work correctly
    - [ ] No broken formatting or layout issues
    ```

---

## Review Process and Next Steps

### What Happens After You Submit?

!!! info "Review Timeline"
    Most pull requests are reviewed within 2-3 days. Complex changes may take longer.

1. **Automated checks** run to ensure your changes don't break anything
2. **Maintainers review** your contribution for quality and fit
3. **Feedback and iteration** - you may be asked to make adjustments
4. **Merge** - once approved, your changes become part of the project!

### Staying Updated

Keep your fork synchronized with the main repository:

```bash
# Fetch updates from the original repository
git fetch upstream

# Switch to your main branch
git checkout main

# Merge updates
git merge upstream/main

# Push updates to your fork
git push origin main
```

---

## Getting Help and Community Guidelines

### Need Help?

!!! question "Stuck? We're Here to Help!"
    Don't hesitate to reach out if you need assistance.

- **GitHub Issues**: Report bugs or ask questions
- **Discussions**: General questions and community chat
- **Discord/Slack**: Real-time community support (if available)

### Community Guidelines

!!! heart "Be Kind and Respectful"
    We're building an inclusive community where everyone feels welcome.

- **Be respectful** in all interactions
- **Provide constructive feedback** when reviewing others' work
- **Help newcomers** get started
- **Follow the code of conduct**
- **Test your changes** before submitting
- **Write clear documentation** for any new features

### Recognition

All contributors are recognized in our [Contributors section](/About/people_info/). Your GitHub profile will be linked, and you'll be invited to join contributor discussions and planning sessions.

---

## Advanced Topics

### Working with Larger Changes

For significant features or content additions:

1. **Open an issue first** to discuss your proposal
2. **Break work into smaller PRs** when possible
3. **Document your changes** thoroughly
4. **Consider backward compatibility**

### Setting Up Development Tools

=== "VS Code Extensions"

    Recommended extensions for better development experience:
    ```bash
    # Install VS Code extensions
    code --install-extension yzhang.markdown-all-in-one
    code --install-extension davidanson.vscode-markdownlint
    code --install-extension ms-python.python
    ```

=== "Git Configuration"

    Set up Git with your information:
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    ```

### Troubleshooting Common Issues

!!! warning "Common Problems and Solutions"

=== "MkDocs Won't Start"

    ```bash
    # Make sure virtual environment is activated
    source mkdocs-env/bin/activate
    
    # Reinstall dependencies
    pip install --upgrade mkdocs mkdocs-material mkdocs-macros-plugin
    ```

=== "Images Not Displaying"

    - Check file paths are correct and case-sensitive
    - Ensure images are in the `docs/assets/` directory
    - Use forward slashes `/` in paths, even on Windows

=== "Navigation Not Updated"

    - Check `mkdocs.yml` syntax
    - Ensure proper indentation (spaces, not tabs)
    - Restart the development server

---

Thank you for contributing to AprenMaker-Hub! Together, we're building something amazing that will help countless people learn and create. 🚀