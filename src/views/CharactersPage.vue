<template>
  <!-- BGM: 브라우저 자동재생 제한 대비용 -->
  <audio ref="bgm" loop>
    <source src="/mordekaiser_bgm.mp3" type="audio/mpeg" />
    브라우저가 오디오 태그를 지원하지 않습니다.
  </audio>

  <div class="headerSection">
    <img src="/riot.png" alt="라이엇" class="logo-img" />
    <button ref="playButton">Mordekaiser</button>
  </div>

  <div class="introSection">
    <img src="/KakaoTalk_20250508_222127808.gif" alt="산-우잘 모데카이저" class="main-img" />
    <h1>산-우잘, 강철의 군주 모데카이저</h1>
    <p>
      강철과 망령으로 세상을 지배하는 자.<br /><br />
      피로 얼룩진 정복의 군주.<br />
      악마의 파멸 산 - 우잘, 불굴의 왕, 대초원의 폭군.<br /><br /><br />
      <strong class="highlight-red">"나는 산 - 우잘, 정복자 중에 정복자요, 폭군 중의 폭군이다."</strong>
    </p>
  </div>

  <div class="symbolSection">
    <img src="/nox.png" alt="녹서스문양" class="logo-img" />
  </div>

  <div class="divider"></div>

  <!-- 출력 영역 -->
  <div class="storyWrapper">
    <div v-html="decodedText" class="storySection"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const bgm = ref(null);
const playButton = ref(null);
const decodedText = ref('');

onMounted(() => {
  decodedText.value = `
<p>먼 옛날, 북부의 황무지를 휘젓고 다니던 잔혹한 군주, 산 - 우잘이 있었다. 
사악한 신념에 따라 움직였던 그는 마주치는 모든 부족과 정착지를 파괴하며 피와 죽음으로 자신의 제국을 건설했다. 
필멸자로서의 삶을 마무리할 때가 되자, 산 - 우잘은 신이 되어 영광스러운 뼈의 전당에서 영원히 살 수 있으리라 생각했다.</p>

<p>하지만 죽음 뒤에는 어떠한 영광도, 전당도 없었다. 
대신 산 - 우잘은 공허한 잿빛 황무지에 서 있는 자신을 발견했다. 
신비로운 안개로 뒤덮인 그곳은 귀에 거슬리는 속삭임이 가득했다. 
이따금 다른 길 잃은 영혼들이 그의 옆을 지나갔다. 
그들은 조금 더 유령에 가까운 모습으로 자신의 존재를 망각한 채 떠돌고 있었다.</p>

<p>산 - 우잘은 분노했다.</p>

<p>그의 신념은 거짓이었을까? 
아니면 신이 되려면 더 많은 땅을 정복해야 했던 것일까? 
이 공허함의 끝에 다른 무언가가 있으리라 생각했지만, 끝없는 공허함만 있을 뿐이었다.</p>

<p>산 - 우잘은 하찮은 영혼들이 안개 속으로 서서히 사라지는 모습을 지켜봤다.</p>

<p><strong style="color: #b30000;">산 - 우잘은 그렇게 사라지길 원치 않았다.</strong></p>

<p>분노와 고통으로 단련된 의지 덕분에 그는 버틸 수 있었다. 
시간이 지나자 알아들을 수 없던 실체 없는 속삭임이 점차 단어가 되어 들리기 시작했다. 
그것은 바로 죽은 자들의 불경한 언어, '오치넌'이었다. 
얼마 남지 않은 산 - 우잘의 정신 속에 사악한 계획이 천천히 떠오르기 시작했다. 
그는 세계 사이를 막고 있는 장막 너머로 유혹의 말을 속삭였다.</p>

<p>자신의 말을 듣는 자에게 불굴의 힘을 선물하겠다고 약속했던 것이다.</p>

<p>아니나 다를까, 한 마법사 무리가 산 - 우잘을 부활시켰다. 
하지만 뼈와 살이 없었던 그는 마법사들에게 그 어떤 인간보다도 강한 몸을 만들어달라고 요구했다. 
산-우잘의 영혼은 생전 자신이 입던 판금 갑옷과 비슷한 형태의 검은 금속 갑옷에 결속되었다. 
그렇게 강철과 증오의 망령이 된 그는 몸을 일으켰다.</p>

<p>힘에 굶주려 있던 마법사들은 산 - 우잘을 자신들의 하찮은 전쟁에 활용하려고 했다. 
하지만 그는 마법사들을 그 자리에서 전멸시켰다.</p>

<p><strong style="color: #b30000;">그들이 지닌 무기나 마력은 산 - 우잘에게 아무 쓸모가 없었다.</strong></p>

<p>마법사들은 그를 다시 봉인하기 위해 그의 이름을 절박하게 울부짖었다. 
하지만 아무런 일도 일어나지 않았다. 
그는 더 이상 산 - 우잘이 아니었기 때문이다.</p>

<p>가벼운 떨림과 함께, 그는 자신의 영적인 이름을 오치넌으로 내뱉었다.</p>

<p><strong style="color: #029658; font-style: italic; font-size: 22px;">'모데카이저(Mordekaiser)'.</strong></p>

<p>그렇게 필멸의 세계를 향한 그의 두 번째 정복 활동이 시작되었다. 
모데카이저의 야망은 예전과 마찬가지로 거창했지만, 이전엔 상상도 할 수 없었던 강령술의 힘을 활용할 수 있었다. 
그는 겁에 질린 채 소멸되고 있는 마법사들의 영혼으로 죽음의 군주에게 어울리는 무기를 빚어냈다.</p>

<p><strong style="color: #029658;">바로 무시무시한 철퇴, '몰락의 밤'이었다.</strong></p>

<p>새로운 무기를 손에 쥔 모데카이저는 마법사들이 일으킨 군대를 장악했다.
적들의 눈에 모데카이저는 학살과 파괴에만 관심이 있는 듯했다.
그의 정복 활동은 전 세대를 소멸시켰다.</p>

<p>하지만 모데카이저에겐 다른 계획이 있었다.</p>

<p>그는 제국의 중심에 불멸의 요새를 건설했다. 
대부분 권력의 상징이라고만 생각했으며, <strong style="color: #d10000;">불멸의 요새</strong>에 숨겨진 비밀을 알게 된 이는 거의 없었다. 
모데카이저는 영혼과 죽음에 관한 금단의 지식을 갈구하며 '다른 세계들'을 진정으로 이해하고자 했다.</p>

<p>하지만 폭정이 계속되자 적들이 생겨났고, 결국 강철의 망령 모데카이저는 녹시이 부족 연합과 측근들의 배신으로 쓰러지고 말았다. 
배신한 측근들이 결성한 비밀 조직은 모데카이저의 영혼과 갑옷을 잇는 연결고리를 끊는 데 성공했고, 
껍데기만 남은 그의 강철 갑옷은 아무도 모르는 장소에 봉인되었다.</p>

<p>그렇게 모데카이저는 물질 세계에서 추방되었다.</p>

<p>하지만 그 누구도 이 모든 것이 모데카이저의 계획이었다는 사실을 알지 못했다. 
사실 추방은 그의 계획에서 필수적인 조건이었다. 
지배와 기만으로 여기까지 올 수 있었던 모데카이저는 뼈의 전당보다 훨씬 위대한 운명이 자신을 기다리고 있다는 것을 깨달았다.</p>

<p>한때 공허한 황무지였던 그곳에 모데카이저의 손에 죽었던 모든 이들이 그를 기다리고 있었다. 
흑마법에 사로잡힌 그들의 영혼은 절대 사라질 수 없었다. 
강력한 영혼들은 불멸의 군대가 되어 모데카이저에게 충성을 맹세했다. 
약한 영혼들 역시 쓸 데가 있었다.</p>

<p>모데카이저는 그들의 영혼을 이루고 있는 신비한 물질을 벽돌과 회반죽으로 삼아 저승에 새 제국을 건설할 계획이었다.</p>

<p>수 세기가 지난 이후, 룬테라 대륙에선 불멸의 요새 주위로 새로운 제국이 건설되었다. 
고대 역사를 연구하는 이들은 모데카이저의 이름을 경외하며 속삭였다. 
이제 그의 악명을 기억하는 건 소수의 고대인 뿐이었다.</p>

<p>그들은 모데카이저가 영원히 현세로 돌아오는 방법을 찾을까 봐 두려워했다.</p>

<p>그저 그날이 오지 않기를 기도할 뿐이다. 그렇게 되면 <strong style="color: #d10000; font-style: italic;"> 모데카이저를 막을 수 없기에.</strong><br></p>

<p><strong style="color: #029658; font-style: italic; font-size: 22px;">" 내가 산 자와 죽은 자의 진정한 군주다! "</strong></p>
`;

  if (bgm.value && playButton.value) {
    playButton.value.addEventListener('click', () => {
      bgm.value.play().catch(err => {
        console.warn("오디오 재생 실패:", err);
      });
      playButton.value.style.display = 'none';
    });
  }
});
</script>

<style scoped>
body, html {
  height: auto;
  overflow-y: auto;
}

body {
  background-color: #111;
  color: white;
  font-family: 'Georgia', serif;
  text-align: center;
  padding: 30px;
}

h1 {
  font-size: 3em;
  color: #b30000;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  max-width: 800px;
  margin: auto;
}

.logo-img {
  max-width: 100px;
  margin: 20px;
}

.main-img {
  margin-top: 30px;
  max-width: 100%;
  height: auto;
  border: 2px solid #b30000;
}

audio {
  display: none;
}

button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(145deg, #5a0000, #8a0303);
  color: #fff;
  border: 2px solid #b30000;
  padding: 15px 25px;
  border-radius: 1px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px #b30000, inset 0 0 5px #000;
  transition: all 0.3s ease;
  z-index: 1000;
  font-family: 'Black Han Sans', sans-serif;
}

button:hover {
  background: linear-gradient(145deg, #9e0000, #b30000);
  transform: scale(1.05);
  box-shadow: 0 0 20px #ff1a1a, inset 0 0 8px #111;
}

.headerSection,
.introSection,
.symbolSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.divider {
  border: solid 2px #b30000;
  box-shadow: 0 0 13px #daff55;
  width: 2px;
  height: 120px;
  background: linear-gradient(90deg, #ffaa00, #ffcc00);
  border-radius: 4px;
  margin: 100px auto;
}

.storyWrapper {
  display: flex;
  justify-content: center;
}

.storySection {
  max-height: 600px;
  overflow-y: auto;
  scroll-behavior: smooth;
  line-height: 1.8;
  font-size: 20px;
  color: #f0f0f0;
  margin: 40px auto;
  width: 100%;
  max-width: 800px;
  text-align: left;
  padding: 20px;
  border: 1px solid #444;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 10px #b30000;
  border-radius: 8px;
}

.storySection::-webkit-scrollbar {
  width: 8px;
}
.storySection::-webkit-scrollbar-thumb {
  background-color: #b30000;
  border-radius: 4px;
}

.highlight-red {
  color: #b30000;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }

  button {
    font-size: 16px;
    padding: 10px 20px;
  }

  .storySection {
    max-height: 600px;
    overflow-y: auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #444;
    box-shadow: 0 0 10px #b30000;
    border-radius: 8px;
    line-height: 1.8;
    font-size: 20px;
    color: #f0f0f0;
    margin: 40px auto;
    max-width: 800px;
    text-align: left;
  }
}
</style>
