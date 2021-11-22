import React from 'react';


const demoLink = 'https://www.youtube.com/watch?v=NGPw8K3Juc0';

const FAQ = () => {
   return (
     <div className="faq">

       <h2>How does this thing work ?</h2>
       <div className="link" onClick={() => window.open(demoLink, "_blank")}>
         Click here to see a demo on youtube. Or just figure it out for yourself, whatever.
       </div>

       <h2>Disclaimer</h2>
       <div className="answer">
         The prices and stock levels shown by this app are, to the best of my knowledge and capability, correct at the
         time of each search. However, I'm not so talented that my code will never have bugs in it, and in particular
         changes to a given website may cause this app to fail to retrieve prices from it. I will endeavour to fix
         issues as quickly as possible whenever they arise, but I can never 100% guarantee the accuracy of the app.
       </div>

       <h2>Where do the prices come from?</h2>
       <div className="answer" >
         When you hit enter (or GO on mobile), a request is sent in real time to each seller. The results displayed
         are their real-time stock and prices.
       </div>

       <h2>Are you constantly scraping these sites?</h2>
       <div className="answer" >
         NO. Absolutely not. Each search is done live - the seller's website receives the same HTTP request it would if
         you were actually on their site. It's effectively the same as opening a new tab for each site, visiting
         the site for real, and doing the search on each individual page.
       </div>

       <h2>Why am I seeing Tundra Wolves when I search for Tundra?</h2>
       <div className="answer">
         When you search for "Tundra" the app displays the results that each site gives for that term - some of those
         might be Tundra Wolves. The app isn't smart enough to know that the extra word means this is a different card.
         "Why not just filter out anything that isn't an exact match?", you might ask. It's a good idea, but
         unfortunately it would exclude a lot of valid results.
         <br/>
         Consider these examples of item names a site might use: "Damnation", "Damnation Foil", "Damnation Judge Promo",
         "Damnation Player Rewards", "Damnation (JPN)" and so on. In order to know that "Damnation - Secret Lair" is a
         valid result but that "Choice of Damnations" isn't, the app would need to have an exhaustive "allow list"
         of terms to ignore when trying to filter results. Inevitably something would get missed off the list, and valid
         results would not be shown. On balance I think it's better to include a few irrelevant results than to exclude
         relevant ones.
         <br />
         I would like to try and fix this - it's the most common piece of feedback I get from people who've used the
         app - but finding an effective solution is proving very difficult, so we're stuck seeing Tundra Wolves for now.
       </div>

       {/*<h2>Why do the results load really quickly sometimes?</h2>*/}
       {/*<div className="answer" >*/}
       {/*  When the results come back from a search, as well as being displayed they are also cached in your browser's*/}
       {/*  sessionStorage. This is a bit like a temporary cookie.*/}
       {/*  If you submit exactly the same search again in the same session, instead of visiting the sellers' websites the*/}
       {/*  app will simply return the cached results. This both improves speed and also reduces the burden on the sellers'*/}
       {/*  websites.*/}
       {/*  If you close the browser/tab/app, the cached results will be lost. So if you search again tomorrow, you'll get*/}
       {/*  fresh prices again.*/}
       {/*</div>*/}

       <h2>Are you favouring any of the sellers or do you have a sponsor?</h2>
       <div className="answer" >
         No. The app does not favour any individual seller - by default it will just list results in order of price.
         There are some options that will let you customise this, including setting your own favourite seller.
       </div>

       <h2>Can you filter / sort the results in such and such a way ?</h2>
       <div className="answer" >
         Ehh... probably not? The app does have options to help control this, but a huge part of the equation is that
         each seller's site is very different and it's not practical to pass on this kind of information. What the app
         does is make a very basic request, usually by passing on the exact string you type and nothing else, and then
         try to manipulate the returned results.
       </div>

       <h2>When will [website] be added?</h2>
       <div className="answer" >
         This app has no dev team and no budget. It's just some guy who writes a bit more code on a Friday evening while
         he has a beer.
         <br/>
         Every website is built differently, which means not every website is equally easy to integrate. Additionally,
         basic vetting (ie, searching for a few popular or valuable cards) may show that a site doesn't have good stock
         levels.
         <br/>
         For these and other practical reasons, a given site might not get the chance to be added to the app - but
         this will not be because of 'playing favourites'.
       </div>

       <h2>When is your birthday?</h2>
       <div className="answer" >
         31st of January, thanks for asking.
       </div>

     </div>
   )
};

export default FAQ;
