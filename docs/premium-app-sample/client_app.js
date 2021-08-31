<!DOCTYPE html>
<html>
    <!--
        Demo to illustrate fetching Genesys Cloud data and the showInteractionDetails(...) SDK method

        Note:  Although this example is hosted with the others here on github; it won't work without
          configuring an OAuth Client and hosting it elsewhere. See js code below for details.

        Reminder: This example is using CDNs and simple javascript to illustrate the SDK. Both the
          Genesys Cloud SDK and Apps SDK can be obtained via npm and support many build tools
          and javascript libraries to fit within your development environment.
    -->
    <head>
        <meta charset="utf-8">
        <title>Treasure Data Integartion Application</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css" integrity="sha384-aUGj/X2zp5rLCbBxumKTCw2Z50WgIr1vs/PFN4praOTvYXWlVyh2UtNUU0KAUhAX" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous">
        <script src="https://sdk-cdn.mypurecloud.com/javascript/latest/purecloud-platform-client-v2.min.js"></script>
        <script src="https://sdk-cdn.mypurecloud.com/client-apps/2.0.0/purecloud-client-app-sdk-e9989de7.min.js"></script>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <!--<script src="utils/oauth.js"></script> -->
       <!-- remove later-->
        <style>
            body {
                width:100%;
                background-color: #f5f5f5;
                max-width: 100%;
                font-family:'Roboto','Avenir','Helvetica','Arial',sans-serif;
                font-weight:400;
            }

            .failure {
                padding: 15px 30px;
                border: 1px solid red;
                color:#444a52;
            }

            section.interactions-example .header {
                display: flex;
                justify-content: space-between;
            }

            button.reload-interactions {
                align-self: center;
            }

            .reloading {
                margin: 10px;
                text-align: center;
                width: 100%;
            }

            .ac-label {
  font-weight: 400;
  position: relative;
  padding: 6px 6px 6px 20px;
  margin-bottom: 0px;
  display: block;
  cursor: pointer;
  background-color: whiteSmoke;
  transition: background-color .15s ease-in-out;
  border-bottom: 1px solid #E9EBED;
}


.ac-label:after, .ac-input:checked + .ac-label:after {
  content: "+";
  position: absolute;
  display: block;
  right: 0;
  top: 0;
  width: 32px;
  height: 100%;
  line-height: 2.25em;
  text-align: center;
  background-color: #e4e9f0;
  transition: background-color .15s ease-in-out;
}

.ac-label:hover:after, .ac-input:checked + .ac-label:after {
  background-color: #b5b5b5;
}

.ac-input:checked + .ac-label:after {
  content: "-";
}

.ac-input {
  display: none;
}

.ac-text {
  opacity: 0;
  height: 0;
  margin-bottom: .5em;
  transition: opacity .5s ease-in-out;
  overflow: hidden;
}

.ac-input:checked ~ .ac-text { 
  opacity: 1;
  height: auto;
}
.singleEl{
    padding-left:0px;
    list-style:none;
}
.singleEl li{
    display:inline-block;
}
.keys{
    text-transform: capitalize;
}
.application-body{
    padding:30px;
}
gux-button>button {
    width: 36px;
    height: 36px;
    overflow: hidden;
    font-family: Roboto, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    pointer-events: auto;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    color: #33383d;
    background-color: #e4e9f0;
}
gux-icon .gux-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
gux-icon .gux-icon-container svg {
    width: 18px;
    max-width: 100%;
    height: 18px;
    max-height: 100%;
    fill: currentColor;
}
.refresh-button gux-icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 18px;
}
.header{
    margin-bottom:20px;
}
.header .buttonHolder{
    float:right;
    display: table-cell;
    position: absolute;
    right: 0px;
    top: 10px;
}
#profileidenifier{
    text-transform: capitalize;
    vertical-align: middle;
    display: inline-flex;
    border-bottom: 1px solid #75a8ff;
    font-size:16px;
    width: calc(100% - 42px);
    height: 30px;
    padding-left: 50px;
}
.header .title{
    display: table;
    vertical-align: middle;
    width: 100%;
    margin-bottom:30px;
    position:relative;
}
#interactionIdHolder{
    background-color: #e4e9f0;
    padding: 10px 20px;
    border-radius: 8px;
}
.section{
    background-color:#ffffff;
    border-radius:8px;
    margin-bottom:20px;
}

.iconHolder{
    width: 32px;
    height: 32px;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    position: absolute;
    margin-top: 15px;
    background-color: #ffffff;
    left: 10px;
    border-radius: 50%;
    border: 1px solid #75a8ff;
}
.iconHolder i{
    font-size: 20px;
    color:#c7c6c6;
    padding-top: 5px;
}
table{
    width:95%;
    margin:0px auto;
    margin-top:20px;

}
tr.heading{
    border-bottom: 1px solid #75a8ff;
}
tr.heading > th{
padding:5px;
}
tr.rows{
    border-bottom: 1px solid #f0f0f0;
}
tr.rows > td{
    padding:5px;
}
.section ul:last-child, .section p:last-child{
    margin-bottom:0px !important
}
gux-button>button:active:enabled {
    background-color: #c3cad4;
}
gux-button>button:hover:enabled {
    background-color: #d3dae2;
}
gux-button>button:focus:enabled {
    box-shadow: 0 0 0 1px #fdfdfd, 0 0 0 4px #aac9ff;
}
gux-button>button:focus {
    outline: none;
}
#bulletSection ul{
    padding-inline-start: 20px;
    margin-block-start: 5px;
}
#bulletSection ul > li{
    padding:5px 0px;
}
#bulletSection ul > li::marker{
color:#e4e9f0;
}
.section p, .section ul{
    padding:5px 20px;
    margin-bottom:0px
}
.section p:last-child, .section ul:last-child{
padding-bottom:20px;
}
.section p:first-child, .section ul:first-child{
padding-top:20px;
}
.meter { 
    box-sizing: content-box;
    height: 20px;
    position: relative;
    margin: 0px 0 0px 0;
    background: #ffffff;
    border-radius: 25px;
    padding: 10px;
    box-shadow: inset 0 -1px 1px rgb(255 255 255 / 30%);
}
.meter > span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: rgb(117, 168, 255);
    background-image: linear-gradient( center bottom, rgb(117, 1168, 255) 37%, rgb(213, 223, 237) 69% );
    box-shadow: inset 0 2px 9px rgb(255 255 255 / 30%), inset 0 -2px 6px rgb(0 0 0 / 40%);
    position: relative;
    overflow: hidden;
}
.meter > span:after, .animate > span > span {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient( 
-45deg
, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent );
    z-index: 1;
    background-size: 50px 50px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
}
@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}
.meter > span::after, .animate > span > span {
  animation: move 2s linear infinite;
}
.authenticating{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(256,256,256,0.7);
    z-index: 1;
    text-align: center;
}

#diamond{
  margin-top: 200px;
  animation: fadeIn .7s ease-in;
}

/*Column 1 */
#col1-big-circle {
  opacity: 0;
  animation: down-one 1.5s ease-in infinite;
  animation-delay: .4s;
}

#col1-small-circle {
  opacity: 0;
  animation: down-two 1.5s ease-in infinite;
  animation-delay: .8s;
}

/* Column 2 */
#col2-small-circle {
  opacity: 0;
  animation: down-three 1.5s ease-in infinite;
}

/* Wave and Diamond */
#wave-fill-front {
  animation: wave-front 9s linear infinite alternate;
}

#wave-fill-back {
  animation: wave-back 9s linear infinite alternate;

}

/* waves */
@keyframes wave-front {
  from {
    transform: translate(-556px, 10%);
  }
  to {
    transform: translate(0%, 10%);
  }
}

@keyframes wave-back {
  from {
    transform: translate(0%, 10%);
  }
  to {
    transform: translate(-556px, 10%);
  }
}

/* Bubbles */
@keyframes down-one {
  0%, 30% {
    opacity: 0;
  }

  35% {
    opacity: .5;
  }

  70% {
    opacity: 1;
  }

  85% {
    opacity: .7;
  }
  
  90%, 100% {
    opacity: 0;
    transform: translateY(50%);
  }
}

@keyframes down-two {
  0%, 30% {
    opacity: 0;
  }

  35% {
    opacity: .5;
  }

  70% {
    opacity: 1;
  }

  85% {
    opacity: .7;
  }
  
  90%, 100% {
    opacity: 0;
    transform: translateY(50%);
  }
}

@keyframes down-three {
  0% {
    opacity: 0;
  }

  5%, 85% {
    opacity: .3;
  }

  30%, 70% {
    opacity: .5;
  }

  50% {
    opacity: 1;
  }

  90%, 100% {
    opacity: 0;
    transform: translateY(50%);
  }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading {
  color: #AEAEAE;
  margin: 12px;
}

.loading:after {
      display: inline-block;
      animation: dotty steps(1,end) 1.5s infinite;
      content: '';
    }

    @keyframes dotty {
        0%   { content: ''; }
        25%  { content: '.'; }
        50%  { content: '..'; }
        75%  { content: '...'; }
        100% { content: ''; }
    }
    #wrapper{
      display:table;
      width:100%;
    }
    @media only screen and (min-width: 390px){
     #mainBody #wrapper:not(.loading){
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
     }
    }

        </style>
    </head>

    <body>
        <noscript>
            For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
        </noscript>

        <section class="authenticating hidden">
          <div id="diamond">
           <div class="preloaderImg"></div>     
          <div class="loading"> Authenticating to Genesys Cloud </div>
        </div>
        </section>
        
        <section class="failure hidden">
            Sorry, an error has occurred.
        </section>
        <section class='application-body' >
                <div class="header">
                    <div class="title"><div class="iconHolder"><i class="fas fa-user-circle"></i></div><div id="profileidenifier"></div><div class="buttonHolder"><gux-button class="refresh-button hydrated"><!----><button type="button" class="gux-secondary reload-interactions"><gux-icon icon-name="ic-refresh" screenreader-text="Refresh" class="hydrated"><div class="gux-icon-container"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-label="Refresh"><path d="M10.887 12.724a5.556 5.556 0 0 1-7.315-1.407l-.357-.474 1.74-1.055L0 7.151.019 12.8l1.6-.993.345.484a7.415 7.415 0 0 0 12.98-1.717l-1.689-.857a5.524 5.524 0 0 1-2.368 3.007zM5.115 3.171a5.555 5.555 0 0 1 7.315 1.407l.362.468-1.745 1.061 4.938 2.626v-5.64l-1.577 1-.365-.5A7.414 7.414 0 0 0 1.061 5.318l1.688.859a5.522 5.522 0 0 1 2.366-3.006z"></path></svg></div></gux-icon></button></gux-button></div></div>
                    <p id="interactionIdHolder"></p>
                </div>  
                <div class="main" id="mainBody">
                  <div id="loadWrapper"></div>
                    <div id="wrapper">
                       <div id="doubleSection" class="section"></div>
                       <div id="singleSection" class="section"></div>
                    </div>
                    <div id="bulletSection"></div>
                    <div id="arraySection"></div>
                </div>
                <div class="footer"></div>
        </section>
        <section class="interactions-example hidden">
           
            <div class="header">
                <div>
                 
                </div>
   
            </div>

            <table class="interactions table table-hover hidden">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Participant</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Type</th>
                        <th scope="col">Wrap Up</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <section style='display:none' class="reloading fas fa-spinner fa-spin fa-3x hidden">
            </section>
        </section>

        <section class="manual-example" >
            <h2 style='display:none'>Manual Tester</h2>
           
            <div id = "interactionsApi"></div>
            <div>
                <p id = "externalContactsApi"></p>
            </div>
            <div class="form-group conversation-id" style='display:none'>
                <label for="conversation-id">Conversation ID:</label>
                <input type="text" class="form-control" id="conversation-id">
            </div>
            <div class="form-group" style='display:none'>
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
            <div class="form-group" style='display:none'>
                <div class="tester-note">[Note:] This tester intentionally bypasses client-side permission checks.</div>
            </div>
        </section>

        <script>
            
            document.addEventListener("DOMContentLoaded", function() {
            let platformClient = window.require("platformClient");

  /*
   * The Client Apps SDK can interpolate the current PC Environment into your app's URL
   * EX: https://mypurecloud.github.io/client-app-sdk/profile.html?pcEnvironment={{pcEnvironment}}
   *
   * Reading the PC Environment from the query string or state param returned from OAuth2 response
   */

  //console.log('The hash has changed!')
  // logging the conersation id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const conversationId = urlParams.get("conversationId");
  const environmentParam = urlParams.get("environment");
  // console.log('param' + environmentParam);
  let pcEnvironment;
  if(typeof environmentParam == 'undefined' || environmentParam == null || environmentParam == ''){
     pcEnvironment = "usw2.pure.cloud";
  } else if (typeof environmentParam !== 'undefined' && environmentParam !== null && environmentParam !== '') {
    pcEnvironment = environmentParam;
  }

  let mediaType;
  let reloadButtonEl = document.querySelector("button.reload-interactions");
  let profileEl = document.querySelector("#profileidenifier");
  let preloadr = '<svg width="113" height="116" viewBox="0 0 113 116" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="preloader"><path id="diamond" d="M81.4056 51H33.7684C33.2594 51 32.7717 51.2045 32.4149 51.5677L21.7272 62.4462C20.9016 63.2866 20.9016 64.6334 21.7272 65.4738L56.8971 101.272C57.7436 102.133 59.1322 102.133 59.9787 101.272L94.3528 66.2838C95.1784 65.4434 95.1784 64.0966 94.3528 63.2562L82.9464 51.6462C82.5403 51.2329 81.9851 51 81.4056 51Z" fill="#F4F4F4" stroke="#F4F4F4" stroke-width="6.48"/><g id="mask-group-back"><mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="-14" y="54" width="686" height="109"><path id="wave-fill-back" d="M-14 163V54.4999C1.5 52.9999 4.5 60.5 24 65C36.7507 67.9425 44.0079 60.176 56.5 59.3857C70.5 58.4999 77 69.6745 89.5 68.9999C100.5 68.4063 100 60.2715 115 59.3857C122.487 58.9436 135.537 67.7705 143.5 66.9999C159 65.4999 158 59.3857 171.5 58.4999C185 57.6142 189 71.0117 206 69.4999C218 68.4328 230 56.4999 239 56.4999C253.319 56.4999 259 70.067 274.5 70.067C290 70.067 303 55.2319 320.5 55.2319C338 55.2319 340.187 75.4999 367 70.067C387.5 65.9132 387.5 53 404 55.2319C420.5 57.4637 426 70.067 440.5 70.067C457 70.067 454 67.2715 475.5 59.3857C497 51.4999 501.5 72.567 518.5 70.067C535.5 67.567 540.5 54 560 54C579.5 54 582.22 73.1739 604 70.067C625.5 66.9999 624.5 59.3857 638 59.3857C652 59.3857 650 71.4999 672 75.4999V163L234 163H-14Z" fill="url(#paint0_linear)"/></mask><g mask="url(#mask0)"><path id="wave-mask-back" d="M81.423 50H31.6737C32.0957 50 32.3085 50.5089 32.0122 50.8093L20.4866 62.493C19.6608 63.3302 19.6564 64.6741 20.4767 65.5167L56.8837 102.91C57.7318 103.781 59.1313 103.781 59.9792 102.91L95.5237 66.3917C96.3439 65.5491 96.3394 64.2053 95.5136 63.3682L82.9607 50.6431C82.5548 50.2316 82.0009 50 81.423 50Z" fill="url(#paint1_linear)"/></g></g><g id="mask-group-front"><mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="16" y="50" width="639" height="113"><path id="wave-fill-front" d="M16 163V62.9463C36 46.9243 42.0009 64.287 62.5 65.9133C82.5 67.5 89.5 55.232 99 55.232C116 55.232 120 63.6208 132.5 62.9463C143.5 62.3526 147.5 52.8583 162.5 55.232C177.5 57.6056 180.962 66.5598 195 65C209.038 63.4402 209 55.232 223 57C231.454 58.0676 240.5 67.5 249 67.5C265 67.5 266.483 60.5159 284.5 57C298.5 54.268 302 70.0671 327.5 70.0671C353 70.0671 362 55.5 380 55.5C398 55.5 414.5 74.2209 432.5 70.0671C450.5 65.9133 457.5 52.5001 478 50.5001C491 49.2318 498.5 65.9133 523.5 65.9133C548.5 65.9133 553.5 50.5001 571 50.5001C585 50.5001 602.5 70.0671 621.5 70.0671C640.5 70.0671 637.5 55.232 655 55.232V163H264H16Z" fill="url(#paint2_linear)"/></mask><g mask="url(#mask1)"><path id="wave-mask-front" d="M81.423 50H31.6737C32.0957 50 32.3085 50.5089 32.0122 50.8093L20.4866 62.493C19.6608 63.3302 19.6564 64.6741 20.4767 65.5167L56.8837 102.91C57.7318 103.781 59.1313 103.781 59.9792 102.91L95.5237 66.3917C96.3439 65.5491 96.3394 64.2053 95.5136 63.3682L82.9607 50.6431C82.5548 50.2316 82.0009 50 81.423 50Z" fill="url(#paint3_linear)"/></g></g><g id="circles"><g id="col-2"><circle id="col2-small-circle" cx="72.5" cy="4.5" r="4.5" fill="#F9C0AD"/></g><g id="col-1"><circle id="col1-big-circle" cx="43" cy="6" r="6" fill="#BED1E3"/><circle id="col1-small-circle" cx="58.5" cy="4.5" r="4.5" fill="#9EB9D5"/></g></g></g><defs><linearGradient id="paint0_linear" x1="329" y1="70.9997" x2="326.49" y2="161.727" gradientUnits="userSpaceOnUse"><stop stop-color="#91BAE1" stop-opacity="0.6"/><stop offset="0.484375" stop-color="#78AAE0" stop-opacity="0.6"/><stop offset="0.911458" stop-color="#6794C3"/></linearGradient><linearGradient id="paint1_linear" x1="58" y1="65" x2="64.5" y2="92.5" gradientUnits="userSpaceOnUse"><stop stop-color="#A4C7EE" stop-opacity="0.3"/><stop offset="0.484375" stop-color="#6493C6" stop-opacity="0.6"/><stop offset="0.911458" stop-color="#5480AD"/></linearGradient><linearGradient id="paint2_linear" x1="271" y1="-30" x2="292.077" y2="227.971" gradientUnits="userSpaceOnUse"><stop stop-color="#A5C9EF" stop-opacity="0.3"/><stop offset="0.619792" stop-color="#6B94C0" stop-opacity="0.6"/><stop offset="1" stop-color="#5480AD"/></linearGradient><linearGradient id="paint3_linear" x1="58" y1="52" x2="64.4476" y2="104.5" gradientUnits="userSpaceOnUse"><stop stop-color="#85AFDE" stop-opacity="0.3"/><stop offset="0.484375" stop-color="#90B5DD" stop-opacity="0.6"/><stop offset="1" stop-color="#6794C4"/></linearGradient></defs></svg>';
  document.querySelector(".preloaderImg").innerHTML = preloadr;
  if (!pcEnvironment) {
    setErrorState(
      "Cannot identify App Embedding context.  Did you forget to add pcEnvironment={{pcEnvironment}} to your app's query string?"
    );
    return;
  }

  let client = platformClient.ApiClient.instance;
  let clientApp = null;
  try {
    clientApp = new window.purecloud.apps.ClientApp({
      pcEnvironment: pcEnvironment
    });
  } catch (e) {
    setErrorState(
      pcEnvironment + ": Unknown/Unsupported Genesys Cloud Embed Context"
    );
    return;
  }

  /*
   *  Set up manual tester now; no PC Auth required
   *
   *  This UI is used for testing purposes to manually navigate to a conversation by ID.
   *  It purposefully ignores the fact that a user may not be authorized to view interactions.
   */


  // Authenticate with Genesys Cloud
  let authenticatingEl = document.querySelector(".authenticating");
  setHidden(authenticatingEl, false);
  let authenticated = false;
  let userDataAcquired = false;
  let canViewInteraction = false;
  let canViewWrapUpCodes = false;
  authenticate(client, pcEnvironment);

 function authenticate(client, pcEnvironment) {
  client.setEnvironment(pcEnvironment);
  client.setPersistSettings(true);
  var clientId = "aa60086c-716b-4f0c-9d51-18083795e25e";
  const { origin, protocol, host, pathname } = window.location;
  const redirectUrl = (origin || `${protocol}//${host}`) + pathname;

    return client.loginImplicitGrant(clientId, redirectUrl, {
      state: `pcEnvironment=${pcEnvironment}, conversationId=${conversationId}`
}).then(data => {
    authenticated = true;
    setHidden(authenticatingEl, true);
     console.log('Authenticated:' + JSON.stringify(data));
      var AccessToekn = data.accessToken;
      var ConversationIdentifier = data.conversationId;
      window.history.replaceState(null, "", `${pathname}?${data.state}#access_token=${AccessToekn}`);
      if(typeof data.accessToken !== 'undefined' && data.accessToken !== null){
        fetch("https://api."+pcEnvironment+"/api/v2/users/me?expand=authorization",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + data.accessToken
        }  
      }
      ).then(function(response) {
        if (response.ok) {
          userDataAcquired = true;
          console.log(response);
          return response.json();
        }
        return Promise.reject(response);
      }).then(function(result) {
        console.log('profileData' + JSON.stringify(result));

        let permissions = result.authorization.permissions;
        if (checkPermission(permissions, "conversation:communication:view") &&
          checkPermission(permissions, "externalContacts:contact:view") )
       {
        canViewInteraction = true;
        getClientHandle(AccessToekn, ConversationIdentifier);
      }
      if (checkPermission(permissions, "routing:wrapupCode:view")) {
        canViewWrapUpCodes = true;
      }
      setHidden(authenticatingEl, true);

      function reloadInteractions() {
        if (reloadButtonEl.disabled) {
          // Poor man's debounce: A click event snuck through before js could disable; ignore it
          return;
        }

        reloadButtonEl.disabled = false;
        setErrorState(null);
        setHidden(reloadingEl, false);
    
      }
      }).catch(function(err) {
      setHidden(authenticatingEl, true);

      if (!authenticated) {
        setErrorState(
          "Failed to Authenticate with Genesys Cloud - " + err.message
        );
      } else if (!userDataAcquired) {
        setErrorState("Failed to locate user in Genesys Cloud");
      }
    });
      }
    });
}
   


  // -- Utility Functions

  function setHidden(el, hidden) {
    if (hidden) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  }

  function extractParams(paramStr) {
    let result = {};

    if (paramStr) {
      let params = paramStr.split("&");
      params.forEach(function(currParam) {
        if (currParam) {
          let paramTokens = currParam.split("=");
          let paramName = paramTokens[0];
          let paramValue = paramTokens[1];
          if (paramName) {
            paramName = decodeURIComponent(paramName);
            paramValue = paramValue ? decodeURIComponent(paramValue) : null;

            if (!result.hasOwnProperty(paramName)) {
              result[paramName] = paramValue;
            } else if (Array.isArray(result[paramName])) {
              result[paramName].push(paramValue);
            } else {
              result[paramName] = [result[paramName], paramValue];
            }
          }
        }
      });
    }

    return result;
  }

  /**
   * Determine the embedding Genesys Cloud environment seeded on the query string or
   * being returned through the OAuth2 Implicit grant state hash param.
   *
   * @returns A string indicating the embedding PC env (e.g. mypurecloud.com, mypurecloud.jp); otherwise, null.
   */
  function getEmbeddingPCEnv() {
    let result = null;

    if (
      window.location.hash &&
      window.location.hash.indexOf("access_token") >= 0
    ) {
      let oauthParams = extractParams(window.location.hash.substring(1));
      if (oauthParams && oauthParams.access_token && oauthParams.state) {
        // OAuth2 spec dictates this encoding
        // See: https://tools.ietf.org/html/rfc6749#appendix-B
        let stateSearch = unescape(oauthParams.state);
        result = extractParams(stateSearch).pcEnvironment;
      }
    }

    if (!result && window.location.search) {
      result =
        extractParams(window.location.search.substring(1)).pcEnvironment ||
        null;
    }

    return result;
  }

  /**
   * Sets the base mode of the app to error and show the provided message
   */
  function setErrorState(errorMsg) {
    let failureEl = document.querySelector(".failure");
    failureEl.textContent = errorMsg || "";
    setHidden(failureEl, !errorMsg);
  }
  function isPermission(item, targetItem) {
    let isItem = item === "*" || targetItem === "*";
    if (!isItem) {
      isItem = item === targetItem;
    }
    return isItem;
  }

  /**
   * Parse the permissions array and check whether or not the match the specified required ones.
   *
   * returns A boolean indicating if the user possesses the required permissions.
   */
  function checkPermission(permissions, permissionValue) {
    let isAllowed = false;

    if (!permissions) {
      permissions = [];
    }

    if (permissionValue.match(/^[a-zA-Z0-9]+:\*$/)) {
        console.log(permissionValue);
      permissionValue = permissionValue.replace("*", "*:*");
    }

    const permissionsToValidate = permissionValue.split(":"),
      targetDomain = permissionsToValidate[0],
      targetEntity = permissionsToValidate[1],
      targetAction = permissionsToValidate[2];

    permissions.forEach(function(permission) {
      const permissions = permission.split(":"),
        domain = permissions[0],
        entity = permissions[1],
        actionSet = permissions[2];

      if (targetDomain === domain) {
        const matchesEntity = isPermission(targetEntity, entity),
          matchesAction = isPermission(targetAction, actionSet);

        if (matchesEntity && matchesAction) {
          isAllowed = true;
        }
      }
    });

    return isAllowed;
  }


  let parameters = extractParams(window.location.search);

  function getClientHandle(token,id) {
      var conversationId = JSON.stringify(parameters.conversationId);
      if(conversationId !== null && typeof conversationId !== 'undefined'){
        document.getElementById("interactionIdHolder").innerHTML =
      "Conversation Id:" + conversationId.replace(/"/g, "");
       var convoId = parameters.conversationId;
      } else {
       var convoId = id;
       var newConversationId = JSON.stringify(id);
       if(id !== null && typeof id !== 'undefined'){
        document.getElementById("interactionIdHolder").innerHTML =
      "Conversation Id:" + id.replace(/"/g, "");
       }
      }
  
    var customerHandle =  function(val) {
    if (typeof val === 'string'){
         val = val;
    } else if (Array.isArray(val) == true){
      val = [val]                    

      }
     
    }
    var paramKey = function(key) {
    if (typeof key === 'string'){
         key = key;
    } else if (Array.isArray(key) == true){
      key = [key]                    
      }
    }

    var newparam = {};
    fetch(
      "https://api."+pcEnvironment+"/api/v2/conversations/" +
      convoId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token
        }
      }
    )
      .then(function(response) {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function(data) {
        var parts = data.participants;
        if (typeof parts !== "undefined" && parts !== null && parts !== "") {
          for (let i = 0; i < parts.length; i++) {
            if (parts[i].purpose == "customer") {
              var media;
              if (parts[i].calls.length > 0) {
                media = "call";
              } else if (parts[i].chats.length > 0) {
                media = "chat";
              } else if (parts[i].emails.length > 0) {
                media = "email";
              }
              if (!("externalContactId" in parts[i])) {
                var profileName = parts[i].name;
              if(typeof profileName !== 'undefined' && profileName !== null){
                profileEl.innerHTML = profileName;
              }
                var customerAttributes = parts[i].attributes;
                if (
                  typeof customerAttributes !== "undefined" &&
                  customerAttributes !== null &&
                  customerAttributes !== ""
                ) {
                  if (media == "chat") {
                      if(customerAttributes["context.email"] == null || typeof customerAttributes["context.email"] == "undefined" || customerAttributes["context.email"] == "" ){
                        if(customerAttributes["context.customField1"] !== null && typeof customerAttributes["context.customField1"] !== "undefined" && customerAttributes["context.customField1"] !== ""){
                          customerHandle = customerAttributes["context.customField1"];
                          paramKey = customerAttributes["context.customField1Label"];
                        }
                      } else {
                       if (customerAttributes["context.customField1"] !== null && typeof customerAttributes["context.customField1"] !== "undefined" && customerAttributes["context.customField1"] !== "" && customerAttributes["context.customField1"] !== null && typeof customerAttributes["context.customField1"] !== "undefined" && customerAttributes["context.customField1"] !== "") {
                              var handleArray = [];
                              var paramArray = [];
                              handleArray.push(customerAttributes["context.email"]);
                              handleArray .push(customerAttributes["context.customField1"]);
                              customerHandle = handleArray;
                              paramArray.push("email");
                              paramArray.push(customerAttributes["context.customField1Label"]);
                              paramKey = paramArray;
                          }

                     else if (customerAttributes["context.customField1"] == null || typeof customerAttributes["context.customField1"] == "undefined" || customerAttributes["context.customField1"] == "" ){
               
                            customerHandle = customerAttributes["context.email"];
                            paramKey = "email";
       
                    } 
                      }
                   
                 

                  } else if (media == "call") {
                    customerHandle = parts[i].address;
                    customerHandle = parseInt(
                      customerHandle.replace(/[^0-9]/g, "")
                    );
                    customerHandle = customerHandle.toString();
                    paramKey = "phone";
                  } else if (media == "email") {
                    customerHandle = parts[i].address;
                    paramKey = "email";
                  }
                  if (
                    typeof customerHandle !== "undefined" &&
                    customerHandle !== null &&
                    customerHandle !== ""
                  ) {
                    newparam = { key: paramKey, value: customerHandle };
                  }
                  var customerParam = JSON.stringify(newparam);
                  console.log("param" + customerParam);

                  if (
                    typeof customerParam !== "undefined" &&
                    customerParam !== null &&
                    customerParam !== ""
                  ) {
                    getDataFromTd(customerParam);
                    reloadButtonEl.addEventListener("click", function() {
                      updateData();
                      getDataFromTd(customerParam);
                    });
                  }
                }
              } else if ("externalContactId" in parts[i]) {
                var externalId = parts[i].externalContactId;
                //console.log('Exernal Contact Id exists')
                fetch(
                  "https://api."+pcEnvironment+"/api/v2/externalcontacts/contacts/" +
                    externalId,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "bearer " + token
                    }
                  }
                )
                  .then(function(response) {
                    if (response.ok) {
                      return response.json();
                    }
                    return Promise.reject(response);
                  })
                  .then(function(data) {
                      if("firstName" in data && "lastName" in data){
                        var profileName = data.firstName + ' ' + data.lastName;
                        if( typeof profileName !== 'undefined' && profileName !== null ){
                            profileEl.innerHTML = profileName;
                        }
                      }
                      
                    // console.log('external contacts api response: '+JSON.stringify(data));
                    if ("workEmail" in data) {
                      customerHandle = data.workEmail;
                      paramKey = "email";
                    } else if ("personalEmail" in data) {
                      customerHandle = data.personalEmail;
                      paramKey = "email";
                    } else if ("otherEmail" in data) {
                      customerHandle = data.otherEmail;
                      paramKey = "email";
                    } else if ("workPhone" in data) {
                      customerHandle = data.workPhone;
                      paramKey = "phone";
                    } else if ("cellPhone" in data) {
                      customerHandle = data.cellPhone;
                      paramKey = "phone";
                    } else if ("homePhone" in data) {
                      customerHandle = data.homePhone;
                      paramKey = "phone";
                    }
                    if (
                      typeof customerHandle !== "undefined" &&
                      customerHandle !== null &&
                      customerHandle !== ""
                    ) {
                      newparam = { key: paramKey, value: customerHandle };
                      var customerParam = JSON.stringify(newparam);
                      console.log("param" + customerParam);
                      if (
                        typeof customerParam !== "undefined" &&
                        customerParam !== null &&
                        customerParam !== ""
                      ) {
                        getDataFromTd(customerParam);
                        reloadButtonEl.addEventListener("click", function() {
                        updateData();
                        getDataFromTd(customerParam);
                        });
                      }
                    }

                    // document.getElementById(
                    //   "externalContactsApi"
                    // ).innerHTML = JSON.stringify(data);
                  });
              }
            }
          }
        }
      });
  }

  function getDataFromTd(raw) {
    let loaderbar = '<div class="boxLoading"><div class="meter animate"><span style="width: 100%"><span></span></span></div></div>';
    document.getElementById('loadWrapper').innerHTML = loaderbar;
    document.getElementById('wrapper').classList.add("loading");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "ex1wx8MYM02yRdOo2eClB1Aa8rcinmDP82n2bEup");
    myHeaders.append("authorizationToken", "abc123");

    //var raw = JSON.stringify({"key":custpmerKey, "value":});
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch(
      "https://fierce-ridge-46359.herokuapp.com/https://9uzgxzyxr0.execute-api.us-east-1.amazonaws.com/test/new_markets_genesys_demo/",
      requestOptions
    )
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function(data) {
        console.log("api response: " + JSON.stringify(data));
        // document.getElementById('mainBoy').innerHTML = JSON.stringify(data);
        makeTablefromTd(data);
      })
      .catch(error => console.log("error", error));
  }

              function makeTablefromTd(result){
                var newResult = result;
                var lists = [];
                var listsArr = [];
                var doubleArr = [];
                var bulletArr = [];
                var profileDetails = [];
                var profileArray = [];
                 var profilVal = [];
                if (typeof newResult !== "undefined" && newResult !== null) {
                  for (var key in newResult) {
                    if (newResult.hasOwnProperty(key)) {
                      if (
                        typeof newResult[key] !== "undefined" &&
                        newResult[key] !== null
                      ) {
                       
                        if ( key.indexOf("name") !== -1) {
                          profileDetails.push(key); 
                        }
                        
                        if (
                          typeof newResult[key] == "string" ||
                          typeof newResult[key] == "number"
                        ) {
                          lists.push(
                            '<p><span class="keys">' +
                              key.replace(/_/g, ' ') +
                              '</span>: <span class="values">' +
                              newResult[key] +
                              "</span></p>"
                          );
                        } else {
                          var Arraydata = newResult[key];
                          var ans = Array.isArray(Arraydata);
                          if (
                            ans == true &&
                            Arraydata !== null &&
                            Arraydata.length > 0 && Arraydata.every(element => element !== null) 
                          ) {
                            var detailslis = [];
                            var newDetails = [];
                            detailsvalues = [];
                            var keyArr = [];
                            var valArr = [];
                            var row = "";
                            var head = "";
                            var filterdArray = [];
                            // Filtering nulls
                            for (let a = 0; a < Arraydata.length; a++) {
                              if (Arraydata[a] !== null) {
                                filterdArray.push(Arraydata[a]);
                              }
                            }
                            //console.log(filterdArray);
                            if (filterdArray.length > 0 && typeof filterdArray[0] !== "object") {
                              // Remove the redundant elements
                              
                             // var newArraydata = filterdArray.map(v => v.toLowerCase());
                              var newArraydata = [];
                              for (var m = 0; m < filterdArray.length; m++) {
                                  if(filterdArray[m] !== null){
                                    newArraydata.push(filterdArray[m].toLowerCase());
                                  }
                                
                                }


                              newArraydata = [...new Set(newArraydata)];
                            } else if (filterdArray.length > 0 && typeof filterdArray[0] == "object") {
                              var newArraydata = filterdArray;
                            }
                             if(newArraydata !== null && typeof newArraydata !== 'undefined' && newArraydata.length > 0 ){
                                for (let i = 0; i < newArraydata.length; i++) {
                                if(newArraydata[i] !== null){
                              var singlearray = newArraydata[i];
                              if (typeof singlearray !== "object") {
                                var detail = JSON.stringify(singlearray);
                                detail = detail.replace(/[{}]/g, "");
                                var newdetail = detail.replace(/['"]+/g, "");
                                detailslis.push("<li>" + newdetail + "</li>");
                              } else {
                                newDetails.push(singlearray);
                                var objkey = Object.keys(singlearray);
                                var objval = Object.values(singlearray);
                                keyArr.push(objkey);
                                valArr.push(objval);
                               }
                              }
                            }

                         }
                           

        
                            if (keyArr.length > 0 && valArr.length > 0) {
                              var keyhead = [];
                              head += "<tr class='heading'>";
                              for (let l = 0; l < keyArr[0].length; l++) {
                                var singleKey = keyArr[0][l];
                                var objk = JSON.stringify(singleKey);
                                objk = objk.replace(/['"]+/g, "");
                                head = head + "<th>" + objk.replace(/_/g, ' ') + " </th>";
                              }
                              head += "</tr>";
                              for (let j = 0; j < valArr.length; j++) {
                                row += "<tr class='rows'>";
        
                                for (let k = 0; k < valArr[j].length; k++) {
                                  var objdetail = JSON.stringify(valArr[j][k]);
                                  var newobjdetail = objdetail.replace(/['"]+/g, "");
                                  row = row + "<td>" + newobjdetail + "</td>";
                                }
                                row += "</tr>";
                              }
        
                              detailsvalues.push(row);
                            }
  
                            if (detailslis !== null && detailslis.length == 1) {
                              doubleArr.push(
                                '<ul class="singleEl"><span class="keys">' +
                                  key.replace(/_/g, ' ') +
                                  '</span>: <span class="values">' +
                                  detailslis.join("") +
                                  "</span></ul>"
                              );
                            } else if ( detailslis !== null && detailslis.length > 1 ) {
                              bulletArr.push(
                                '<div class="ac"> <input class="ac-input" id="' +
                                  key +
                                  '" name="' +
                                  key +
                                  '" type="checkbox"> <label for="' +
                                  key +
                                  '" class="ac-label"><span class="keys">' +
                                  key.replace(/_/g, ' ') +
                                  '</label><div class="ac-text"><ul>' +
                                  detailslis.join("") +
                                  "</ul></div></div>"
                              );
                            }
                            if (detailsvalues.length > 0 && key.indexOf("Segment_info") == -1) {
                              listsArr.push(
                                '<div class="ac"> <input class="ac-input" id="' +
                                  key +
                                  '" name="' +
                                  key +
                                  '" type="checkbox"> <label for="' +
                                  key +
                                  '" class="ac-label"><span class="keys">' +
                                  key.replace(/_/g, ' ') +
                                  '</label><div class="ac-text"><table class="detailsTable">' +
                                  head +
                                  detailsvalues.join("") +
                                  "</table></div></div>"
                              );
                            }
                          }
                        }
                      }
                    }
                  }
                var keyPool = profileDetails.sort();
                
                for (let b = 0; b <  keyPool.length; b++) {
               var dataKey = keyPool[b];
               var dataVal = newResult[dataKey];
               if(Array.isArray(dataVal) == true){
                var profileData = [];
                for (var n = 0; n < dataVal.length; n++) {
                    if(dataVal[n] !== null){
                        profileData.push(dataVal[n].toLowerCase());
                    }
                                
                }             

                profileData = [...new Set(profileData)]; 
                if(profileData.length == 1){
                   profileArray.push(profileData[0]); 
                  } else if (profileData.length > 0){
                    var currentName = profileEl.innerHTML;
                    if (currentName !== null && typeof currentName !== 'undefined' && currentName !== ''){
                        console.log(currentName);
                        var myArr = currentName.split(" ");
                        console.log(myArr);
                        var diff = [];
                        for(var t = 0; t < myArr.length; t++) {
                              if(profileData.indexOf(myArr[t]) !== -1){
                                diff.push(myArr[t]);
                              }
                            }
                        console.log(diff);
                        if(diff !== null && diff.length > 0 && typeof diff !== 'undefined'){
                            profileArray.push(diff[0]);  
                          } else {
                            profileArray.push(profileData[0]); 
                          }
                    } else {
                        profileArray.push(profileData[0]); 
                    }
                  }
                } else if(typeof dataVal == "string" ) {
                    profileArray.push(dataVal); 
                }
              
             }
                if(profileArray.length > 0){
                    profileEl.innerHTML = profileArray.join(' ');
                }   
    
          }
                lists = lists.sort();
                doubleArr = doubleArr.sort();
                document.getElementById('loadWrapper').innerHTML = "";
                document.getElementById('wrapper').classList.remove("loading");
                if(lists.length > 0){
                    document.getElementById("singleSection").innerHTML = lists.join("");
                } else {
                    document.getElementById("singleSection").style.display = 'none';
                }
                if(doubleArr.length > 0){
                    document.getElementById("doubleSection").innerHTML = doubleArr.join("");
                } else {
                    document.getElementById("doubleSection").style.display = 'none';
                }
                
                document.getElementById("arraySection").innerHTML = listsArr.join("");
                
                document.getElementById("bulletSection").innerHTML = bulletArr.join("");
               
          }

          function updateData(){
            document.getElementById("singleSection").innerHTML = "";
            document.getElementById("arraySection").innerHTML  = "";
            document.getElementById("doubleSection").innerHTML = "";
            document.getElementById("bulletSection").innerHTML = "";
          }




});

        </script>
    </body>
</html>
