function addThreeNums(a,b,c) {
  function addtwonums(x,y){
    return x+y;
  }
  return addtwonums(a,addtwonums(b,c))
}
addtwonums(1,2)