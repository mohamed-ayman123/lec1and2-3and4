
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const people = [];

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// 1. Enter data for 10 people
async function enterPeople() {
  for (let i = 0; i < 10; i++) {
    console.log(`\nEnter data for person ${i + 1}`);

    const id = await askQuestion("Enter ID: ");
    const firstName = await askQuestion("Enter first name: ");
    const lastName = await askQuestion("Enter last name: ");
    const age = await askQuestion("Enter age: ");
    const city = await askQuestion("Enter city: ");

    people.push({
      id: Number(id),
      firstName,
      lastName,
      age: Number(age),
      city,
    });
  }

  console.log("\n10 people added successfully!");
  await showMenu();
}

// 2. Display menu
async function showMenu() {
  while (true) {
    console.log("\n========== MENU ==========");
    console.log("1. View all people");
    console.log("2. View a specific person");
    console.log("3. Delete all people");
    console.log("4. Delete a specific person");
    console.log("5. View full name and city of each person");
    console.log("6. Exit");
    console.log("==========================");

    const choice = await askQuestion("Choose an option: ");

    // View all people
    if (choice === "1") {
      if (people.length === 0) {
        console.log("No people found!");
      } else {
        console.table(people);
      }
    }

    // View a specific person
    else if (choice === "2") {
      const id = await askQuestion("Enter person ID: ");

      const person = people.find(
        (p) => p.id === Number(id)
      );

      if (person) {
        console.table([person]);
      } else {
        console.log("Person not found!");
      }
    }

    // Delete all people
    else if (choice === "3") {
      if (people.length === 0) {
        console.log("No people to delete!");
        continue;
      }

      const confirm = await askQuestion(
        "Delete all people? (yes/no): "
      );

      if (confirm.toLowerCase() === "yes") {
        people.length = 0;
        console.log("All people deleted successfully!");
      } else {
        console.log("Delete cancelled.");
      }
    }

    // Delete a specific person
    else if (choice === "4") {
      const id = await askQuestion(
        "Enter the ID of the person to delete: "
      );

      const index = people.findIndex(
        (p) => p.id === Number(id)
      );

      if (index !== -1) {
        const deletedPerson = people.splice(index, 1)[0];

        console.log(
          `${deletedPerson.firstName} ${deletedPerson.lastName} deleted successfully!`
        );
      } else {
        console.log("Person not found!");
      }
    }

    // View full name and city of each person
    else if (choice === "5") {
      if (people.length === 0) {
        console.log("No people found!");
      } else {
        const result = people.map((person) => ({
          fullName: `${person.firstName} ${person.lastName}`,
          city: person.city,
        }));

        console.table(result);
      }
    }

    // Exit
    else if (choice === "6") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    else {
      console.log("Invalid choice! Choose from 1 to 6.");
    }
  }
}

// Run program
enterPeople().catch((error) => {
  console.error("An error occurred:", error);
  rl.close();
});