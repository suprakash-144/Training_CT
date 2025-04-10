const form = document.getElementById("registrationForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Clear any previous error or response messages
  document
    .querySelectorAll(".error-message")
    .forEach((span) => (span.textContent = ""));

  // // Get form values
  const Name = document.getElementById("name").value.trim();
  const Email = document.getElementById("email").value.trim();
  const Phone = document.getElementById("Phone").value.trim();
  const DOB = document.getElementById("DOB").value.trim();
  const Gender = document.getElementById("Gender").value.trim();
  const City = document.getElementById("City").value.trim();
  const State = document.getElementById("State").value.trim();
  const Country = document.getElementById("Country").value.trim();
  const Address = document.getElementById("Address").value.trim();
  const Message = document.getElementById("Message").value.trim();
  const Terms = document.getElementById("flexCheckDefault").value;

  const radios = document.getElementsByName("yesno");
  var sessionreq;
  var formValid = false;

  var i = 0;
  while (!formValid && i < radios.length) {
    if (radios[i].checked) {
      formValid = true;
      sessionreq = radios[i].value;
    }
    i++;
  }

  // validation of fiels

  let hasError = false;
  if (Name === "") {
    document.getElementById("error-name").textContent = "Name is required";
    hasError = true;
  }
  if (!formValid) {
    document.getElementById("error-radio").textContent =
      "Must check some option!";
    hasError = true;
  }
  if (Email === "") {
    document.getElementById("error-email").textContent = "Email is required";
    hasError = true;
  }
  if (Phone === "" || Phone.length != 10) {
    document.getElementById("error-phone").textContent = "Must be of 10 digits";
    hasError = true;
  }
  if (DOB === "") {
    document.getElementById("error-Dob").textContent =
      "Date of Birth is required";
    hasError = true;
  }
  if (Gender === "") {
    document.getElementById("error-gender").textContent = "Gender is required";
    hasError = true;
  }
  if (City === "") {
    document.getElementById("error-city").textContent = "City is required";
    hasError = true;
  }
  if (State === "") {
    document.getElementById("error-state").textContent = "State is required";
    hasError = true;
  }
  if (Country === "") {
    document.getElementById("error-country").textContent =
      "Country is required";
    hasError = true;
  }
  if (Address === "") {
    document.getElementById("error-address").textContent =
      "Address is required";
    hasError = true;
  }
  if (Message === "") {
    document.getElementById("error-message").textContent =
      "Message is required";
    hasError = true;
  }

  // submition of data
  if (hasError == false) {
    try {
      let formData = {
        id: Math.floor(Math.random() * 1000000),
        name: Name,
        email: Email,
        phone: Phone,
        DOB: DOB,
        gender: Gender,
        city: City,
        country: Country,
        state: State,
        address: Address,
        message: Message,
        counselling_request: sessionreq,
        terms: Terms,
      };

      // storeing in localstorage

      const savedData = localStorage.getItem("data");
      const submissions = savedData ? JSON.parse(savedData) : [];
      submissions.push(formData);
      console.log(submissions);

      localStorage.setItem("data", JSON.stringify(submissions));
      alert(`Form was submited : ${Name}`);
    } catch (error) {
      alert(`Failed`);
    }
  } else {
    return;
  }
  form.reset();
});
