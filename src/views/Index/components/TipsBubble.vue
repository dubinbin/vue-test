<template>
 <div class="punchTipsBubbleWrap">
    <div class="punchTipsBubble">
       <div class="punchTipsBubbleBox">
         <p>再签{{num}}天</p>
        </div>
    </div>
 </div>
</template>

<script>
export default {
    props: {
       num: {
          type: Number
       }
    }
}
</script>

<style>
.punchTipsBubbleWrap {
  position: absolute;
  top: -19px;
  left: 50%;
  height: 21px;
  background-image: url('../assets/images/bubble.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: translate(-50%);
}
.punchTipsBubbleWrap .punchTipsBubble {
  position: relative;
  width: 49px;
  top: 2px;
}
.punchTipsBubbleWrap .punchTipsBubble .punchTipsBubbleBox {
  height: 16px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}
.punchTipsBubbleWrap .punchTipsBubble .punchTipsBubbleBox p {
  position: relative;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #FF5A31;
  letter-spacing: 0;
  text-align: center;
  white-space: nowrap;
}

</style>
