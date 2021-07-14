import React from 'react';
import foilStar from '../resources/foil-star.png';


const demoLink = 'https://www.youtube.com/watch?v=NGPw8K3Juc0';

const FAQ = () => {
   return (
     <div className="faq">

       <h2>How does this thing work ?</h2>
       <div className="link" onClick={() => window.open(demoLink, "_blank")}>
         Click here to see a demo on youtube. Or just figure it out for yourself, whatever.
       </div>

       <h2>Where do the prices come from?</h2>
       <div className="answer" >
         When you hit enter (or GO on mobile), a search is sent in real time to each seller. The seller's website
         receives the same HTTP request it would if you were actually on their site. The results displayed
         are their real-time stock and prices. It's effectively the same as opening a new tab for each site, visiting
         the site for real, and doing the search on each individual page.
       </div>

       <h2>Are you constantly scraping these sites?</h2>
       <div className="answer" >
         NO. Absolutely not. There are too many magic cards to check prices of and that would basically be a DDoS attack.
         Searches are done as and when app users request them - live. That's why they're kind of slow.
       </div>

       <h2>Why do the results load really quickly sometimes?</h2>
       <div className="answer" >
         When the results come back from a search, as well as being displayed they are also cached in your browser's
         sessionStorage. This is a bit like a temporary cookie or login session.
         If you submit exactly the same search again in the same session, instead of visiting the sellers' websites the
         app will simply return the cached results. This both improves speed and also reduces the burden on the sellers'
         websites.
         If you close the browser/tab/app, the cached results will be lost. So if you search again tomorrow, you'll get
         fresh prices again.
       </div>

       <h2>Are you favouring any of the sellers or do you have a sponsor?</h2>
       <div className="answer" >
         NO. Categorically and unequivocally, no part of this app is currently intended to favour any individual seller.
         The results are retrieved from the integrated sellers in alphabetical order, and unless you use some of the
         display options you will see the results displayed in that order too.

         IF - and that's a big if - there are any changes in this regard, it will be made extremely clear.
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
         That being said, the goal is to improve the app as much as possible as and when time allows.
         If you know about a site you think should be added, please send an email to ANRoebuck@googlemail.com with the
         subject "Your stupid app".
         ____

         Every website is built differently, which means not every website is equally easy to integrate. Additionally,
         basic vetting (ie, searching for a few popular or valuable cards) may show that a site doesn't have good stock
         levels. For either of these reasons, a suggested site might not get the chance to be added to the app.
       </div>

       <h2>Can the app do [thing]?</h2>
       <div className="answer" >
         This app has no dev team and no budget. It's just some guy who writes a bit more code on a Friday evening while
         he has a beer.
         That being said, the goal is to improve the app as much as possible as and when time allows.
         If you have an idea for a feature that could be added, please send an email to ANRoebuck@googlemail.com with
         the subject "Your stupid app".
       </div>

       <h2>When is your birthday?</h2>
       <div className="answer" >
         31st of January, thanks for asking.
       </div>

     </div>
   )
};

export default FAQ;
