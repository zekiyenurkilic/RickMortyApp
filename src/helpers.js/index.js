export const getRandomColor = () => {
  const colors = ["#44281d", "#e4a788", "#f0e14a", "#97ce4c", "#e89ac7",]
  return colors[Math.floor(Math.random(0, 1) * colors.length)]
}

export const getGenderIcon = (gender) => {

  let iconName = "male";


  switch (gender) {
    case "Female":
      iconName = "female"
      break;
    case "unknown":
      iconName = "neuter"
      break;
    case "Male":
      iconName = "male"
      break;
    case "Genderless":
      iconName = "genderless";
      break;


    default:
      break;
  }

  return iconName
}


