

document.getElementById("discountType").addEventListener("change", (e)=>{
  const  discountPercentage = document.getElementById("discountPercentage")
 if(e.target.value=="PERCENTAGE") {
   discountPercentage.removeAttribute("disabled")
   discountPercentage.required = true
 } else {
  discountPercentage.removeAttribute("required")
  discountPercentage.disabled = true
  discountPercentage.value = ""
 }
})