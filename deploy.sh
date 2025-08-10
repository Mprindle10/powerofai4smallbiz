#!/bin/bash

# Netlify Deployment Script for PowerOfAI4SmallBiz
# This script automates the deployment process from GitHub to Netlify

set -e  # Exit on any error

echo "🚀 Starting Netlify Deployment Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_NAME="powerofai4smallbiz"
BRANCH="main"
NETLIFY_SITE_NAME="powerofai4smallbiz"

echo -e "${BLUE}📁 Project: ${REPO_NAME}${NC}"
echo -e "${BLUE}🌿 Branch: ${BRANCH}${NC}"
echo -e "${BLUE}🌐 Site: ${NETLIFY_SITE_NAME}.netlify.app${NC}"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found. Make sure you're in the project root directory.${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment checks...${NC}"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: This is not a git repository.${NC}"
    exit 1
fi

# Check git status
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes. Committing them now...${NC}"
    
    # Add all changes
    git add .
    
    # Ask for commit message or use default
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Auto-deployment: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    git commit -m "$commit_msg"
    echo -e "${GREEN}✅ Changes committed successfully${NC}"
else
    echo -e "${GREEN}✅ Working directory clean${NC}"
fi

# Push to GitHub
echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"
git push origin ${BRANCH}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    exit 1
fi

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}📦 Netlify CLI not found. Installing...${NC}"
    npm install -g netlify-cli
fi

# Check if user is logged in to Netlify
if ! netlify status &> /dev/null; then
    echo -e "${YELLOW}🔐 Please log in to Netlify CLI...${NC}"
    netlify login
fi

# Deploy to Netlify
echo -e "${YELLOW}🚀 Deploying to Netlify...${NC}"

# Deploy using Netlify CLI
netlify deploy --prod --dir=. --site=${NETLIFY_SITE_NAME}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Your site is live at: https://${NETLIFY_SITE_NAME}.netlify.app${NC}"
    echo -e "${GREEN}📊 Admin dashboard: https://${NETLIFY_SITE_NAME}.netlify.app/admin${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "${BLUE}📈 Deployment Summary:${NC}"
echo -e "${BLUE}├── Repository: https://github.com/Mprindle10/${REPO_NAME}${NC}"
echo -e "${BLUE}├── Live Site: https://${NETLIFY_SITE_NAME}.netlify.app${NC}"
echo -e "${BLUE}├── Admin Panel: https://${NETLIFY_SITE_NAME}.netlify.app/admin${NC}"
echo -e "${BLUE}└── Local Server: http://localhost:8000${NC}"

echo -e "${GREEN}✨ Deployment completed successfully!${NC}"
