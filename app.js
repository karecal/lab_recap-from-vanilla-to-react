// app.js

const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let skip = 0; // Keep track of how many users to skip for pagination
const limit = 10; // How many users to fetch at a time

// The function that fetches and renders users
async function fetchAndRenderUsers() {
  try {
    loadMoreBtn.textContent = "Loading...";
    loadMoreBtn.disabled = true;

    // 1. Fetch data from the API using skip and limit for pagination
    const response = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    const jsonResponse = await response.json();
    const users = jsonResponse.users;

    // 2. Create and append elements for each user (DOM Manipulation)
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <p>${user.firstName} ${user.lastName}</p>
      `;
      userListContainer.appendChild(userCard);
    });

    skip += limit; // Increase skip for the next fetch
  } catch (error) {
    console.error("Failed to fetch users:", error);
    userListContainer.innerHTML = "<p>Something went wrong!</p>";
  } finally {
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

loadMoreBtn.addEventListener("click", fetchAndRenderUsers);

// Fetch the first batch of users on page load
fetchAndRenderUsers();