export function lightHover(tds, r = 80) {


  // if (tds.length == 0) return;

  document.addEventListener("mousemove", function (e) {

    // 鼠标坐标
    let x = e.pageX;
    let y = e.pageY;

    //效果盒子组
    // let tds = document.querySelectorAll(".day");
    //光标范围半径
    for (let index = 0; index < tds.length; index++) {
      // //蓝色边框跳过
      // if (tds[index].className.indexOf("click") != -1) {
      //     // tds[index].style.backgroundColor = "";
      //     continue;
      // }
      //每个日期格的边距离视口的距离
      let element = tds[index].getBoundingClientRect();
      let L = element.x;
      let R = element.x + element.width;
      let T = element.y;
      let B = element.y + element.height + 20;
      // console.log("T = ", T, "B = ", B, "L = ", L, "R = ", R);
      //计算光标相对日期格的距离
      let YT = T - y - r;
      let YB = B - y + r;
      let XL = L - x - r;
      let XR = R - x + r;
      // console.log("YT = ", YT, "YB = ", YB, "XL = ", XL, "XR = ", XR);


      // 当光标超出盒子反应范围
      if (YT > 0 || XL > 0 || YB < 0 || XR < 0) {
        tds[index].style.backgroundImage = "";
      } else { // 当光标在盒子反应范围内
        //将盒子反应范围分成四个区域 上 下 左 右，分别处理光标从四个反向降临
        if (YT < 0 && YT + r > 0) { //光标在上面
          if (XL < 0 && XL + r > 0) { //光标在左面
            let AB = Math.sqrt(((x - L) * (x - L) + (y - T) * (y - T)));
            // console.log("AB:", AB);
            // console.log("r-AB:", r - AB);
            let px = r - AB;
            tds[index].style.backgroundImage = `radial-gradient(circle ${px}px at top left, var(--ayong-primary-grey), var(--ayong-primary))`;
          } else if (XL + r < 0 && XR - r > 0) { //光标在正上面
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (T - y)}px at top, var(--ayong-primary-grey), var(--ayong-primary))`;

          } else if (XR > 0 && XR - r < 0) { //光标在右面
            let AB = Math.sqrt(((x - R) * (x - R) + (y - T) * (y - T)));
            // console.log("AB:", AB);
            // console.log("r-AB:", r - AB);
            let px = r - AB;
            tds[index].style.backgroundImage = `radial-gradient(circle ${px}px at top right,var(--ayong-primary-grey), var(--ayong-primary))`;
          }

        } else if (YT + r < 0 && YB - r > 0) { //在上与下之间
          if (XL < 0 && XL + r > 0) { //左
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (L - x)}px at  left, var(--ayong-primary-grey), var(--ayong-primary))`;

          } else if (XR > 0 && XR - r < 0) {
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (x - R)}px at  right,var(--ayong-primary-grey), var(--ayong-primary))`;
          }

        } else if (YB > 0 && YB - r < 0) { //光标在下面
          if (XL < 0 && XL + r > 0) { //光标在左面
            let AB = Math.sqrt(((x - L) * (x - L) + (y - B) * (y - B)));
            // console.log("AB:", AB);
            // console.log("r-AB:", r - AB);
            let px = r - AB;
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (x - R)}px at  right,var(--ayong-primary-grey), var(--ayong-primary))`;
          } else if (XL + r < 0 && XR - r > 0) { //光标在正下面
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (x - R)}px at  right,var(--ayong-primary-grey), var(--ayong-primary))`;

          } else if (XR > 0 && XR - r < 0) { //光标在右面
            let AB = Math.sqrt(((x - R) * (x - R) + (y - B) * (y - B)));
            // console.log("AB:", AB);
            // console.log("r-AB:", r - AB);
            let px = r - AB;
            tds[index].style.backgroundImage = `radial-gradient(circle ${r - (x - R)}px at  right,var(--ayong-primary-grey), var(--ayong-primary))`;
          }

        }


      }
      //当光标在盒子里
      if ((x > L && x < R) && (y > T && y < B)) {
        tds[index].style.backgroundImage = "";
        tds[index].style.backgroundColor = "var(--ayong-primary-grey)";
      } else {
        tds[index].style.backgroundColor = "";
      }

    }


  })
}
