# Engineering Inflammatory Content

###A Memetic Analysis of Russian Social Media Propaganda

####Mitch Chaiet

RTF 368S - MEDIA STUDIES THESIS 
Radio -Television - Film
The University of Texas at Austin

July 12, 2019

Supervising Professor:

Sharon Strover, Ph.D.
Philip G. Warner Regents Professor of Communication
Director, Technology & Information Policy Institute
Moody College of Communication | The University of Texas at Austin 

***
<p style="text-align:center">
<img src="https://github.com/umd-mith/irads/blob/master/site/images/616.png?raw=true" width="300" />
<img src="https://github.com/umd-mith/irads/blob/master/site/images/1258.png?raw=true" width="300" />
</p>
***
The Russians sourced content already proven to be popular among certain demographics, from hashtags and sites already popular among those demographics, edited them to convey their target messages, and spread them through Russian owned parody pages targeting the same demographics said content was sourced from. They provided minimal funding to spur their propagation, in order to propagate those images in a peer to peer fashion (memetically). 
***

## Memetic Distribution vs. Viral Distribution

An often debated dichotomy within internet culture is the difference between content “going viral” or “becoming a meme.” 

Therein lies a significant difference between "viral distribution" and "memetic distribution". 



### Key Differences between Memetic Distribution and Virality:

**Viral Content:**

* A Single Cultural Unit
* Limited to one digital medium (eg, a viral video)
* Rapidly expanding popularity on a single popular hypermedia platform (“this video reaches 3 Billion views on YouTube)
* Content rapidly reaches pop culture status and is widely known; can quantify maximum popularity by some generally available metric easily (views, likes, retweets, sales)
* Generally distributed through hyperlinks and word of mouth; the content itself is generally has too large of a file size to be shared in a peer-to-peer manner as attachments and must be hosted on a platform for wide access (“I’ll send you a link to this video; Go look up “Gangam Style” on YouTube”)

<iframe width="560" height="315" src="https://www.youtube.com/embed/uksCZSU1Gu0?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Memetic Content:**

* Always a collection of texts, involving multiple cultural units
* Content often takes advantage of an absurdist misuse of a social networking feature; often exploits the medium of distribution to increase psychovisual impact of the content in a humorous manner 
	“Do you know da wae” “Storm Area 51, They Can’t Stop All Of Us”
	Spongebob Squarepants, The Communist Manifesto on Pornhub.com
* Expands upon convergent media; the meme can be originated, conform to, or be extended by many different hypermedia and traditional media formats, including but not limited to Facebook Events, YouTube Videos, Tweets, Profile Pictures, 3D Modeling software, books, print, and audio/video.
* Values convenience over quality; degrade in quality often used as a cultural embodiment of the subculture and a view of identity and understanding

Replace with Memetic Distribution Video Embed


**Three key lenses for analyzing memetic internet content:**
* Access - what groups are circulating which content? Was the media distributed via a link, by sharing the actual image, or other? Was there a paywall for access? 
* Attribution - Who originally created the meme? Who posted the meme? Who took credit for the meme? 
* Ownership - What platform is the meme present on, who has monetized the distribution, who has control of the deletion of the post?

<iframe src="https://mitchaiet.kumu.io/strictly-platonic-memetic-propagation-analysis" width="1024" height="576" frameborder="0"></iframe>

##1. Research Questions:

How did the Internet Research Agency effectively strategize, source, and deploy deceptive social media campaigns tasked with distributing misinformation, while maintaining anonymity?

Where did the images used to compose the Russian ads circulate previously to being used as a Facebook ad?

Were the sources of the images intertextually related to the demographics targeted by the ads they were contained within?

##2. Methods

In order to analyze the memetic propagation of the Russian Ads dataset, I utilized [node-mapping application Maltego XL](https://www.paterva.com/buy/maltego-clients/maltego-xl.php) as a host environment for running the analysis, and [reverse-image search service Tineye](https://www.tineye.com/) to search the web.

The U.S. House of Representatives Permanent Select Committee on Intelligence released a dataset of 3,500 Facebook ads in PDF format, downloadable at [intelligence.house.gov](https://intelligence.house.gov/social-media-content/social-media-advertisements.htm) with direct links reproduced below. 

- 2015:
 - [Quarter 2](https://intelligence.house.gov/uploadedfiles/facebook-ads/2015-q2.zip) (218 MB)
 - [Quarter 3](https://intelligence.house.gov/uploadedfiles/facebook-ads/2015-q3.zip) (662 MB)
 - [Quarter 4](https://intelligence.house.gov/uploadedfiles/facebook-ads/2015-q4.zip) (397 MB)

- 2016:
 - [Quarter 1](https://intelligence.house.gov/uploadedfiles/facebook-ads/2016-q1.zip) (522 MB)
 - [Quarter 2](https://intelligence.house.gov/uploadedfiles/facebook-ads/2016-q2.zip) (1.4 GB)
 - [Quarter 3](https://intelligence.house.gov/uploadedfiles/facebook-ads/2016-q3.zip) (656 MB)
 - [Quarter 4](https://intelligence.house.gov/uploadedfiles/facebook-ads/2016-q4.zip) (1.6 GB)

* 2017:
 - [Quarter 1](https://intelligence.house.gov/uploadedfiles/facebook-ads/2017-q1.zip) (1.4 GB)
 - [Quarter 2](https://intelligence.house.gov/uploadedfiles/facebook-ads/2017-04.zip) April (1.2 GB)
 - [Quarter 2](https://intelligence.house.gov/uploadedfiles/facebook-ads/2017-05.zip) May (754 MB)
 - [Quarter 3](https://intelligence.house.gov/uploadedfiles/facebook-ads/2017-q3.zip) (24 MB)

[irads](https://github.com/umd-mith/irads), available on Github from the Maryland Institute for Technology in the Humanities, parses the original U.S. House of Representatives PDF's into structured data, available in [JSON](https://raw.githubusercontent.com/edsu/irads/master/site/index.json) and [CSV](https://raw.githubusercontent.com/edsu/irads/master/site/index.csv) format. This structured dataset was the starting point for my analysis.

In order to import this data into [Maltego XL](https://www.paterva.com/buy/maltego-clients/maltego-xl.php), which only allows for the import of properly structured CSV files, I restructured the irads parsed dataset partially, most significantly sorting the objects in ascending order by Ad ID. 

* [irads parsed CSV dataset](https://raw.githubusercontent.com/edsu/irads/master/site/index.csv) 

* [Mitch Chaiet's sorted CSV dataset](https://raw.githubusercontent.com/mitchaiet/RussianAds/master/data/datasetinit.csv)

For each ad, the dataset contains the following fields:

```
id
image
title
description
facebook_url
impressions
clicks
created
ended
cost
currency
location
residence
match
interest
behavior
politics
multicultural_affinity
employer
industry
field_of_study
exclude
language
age
placement
```

In order to properly store this data in Maltego XL, I created a Maltego Entity entitled "Russian Facebook Ad" (mitchaiet.RussianFBAd). This allowed each ad and it's associated metadata to be stored as a single node within [Maltego XL](https://www.paterva.com/buy/maltego-clients/maltego-xl.php). The entity is included as part of this project's repository. Download the entity below and import it into Maltego XL if you are repeating this process. 

- [Russian Facebook Ad Maltego Entity (.mtz)](https://github.com/mitchaiet/RussianAds/blob/master/data/Russian%20Facebook%20Ad%20Entity.mtz)

In order to facilitate the quality of the search results I found, I manually cropped each source image to remove the Page Name, Ad Description, and Reactions. Every cropped image is available in the repository.

- [Russian Facebook Ads Cropped
](https://github.com/mitchaiet/RussianAds/tree/master/cropped_images)

Here is Ad ID 1 as an uncropped source image: 

![](https://github.com/umd-mith/irads/blob/master/site/images/1.png?raw=true)

Here is Ad ID 1 as a cropped image:

![](https://github.com/mitchaiet/RussianAds/blob/master/cropped_images/1.png?raw=true)

The input for each Tineye search was the cropped image.

In order to run reverse image searches via the [Tineye API](https://services.tineye.com/developers/tineyeapi/what_is_tineyeapi), I created a Maltego Transform which allowed me to select a Russian Facebook Ad entity, and perform a search using the cropped version of the image. 

The Tineye reverse image search results were returned to Maltego XL as nodes connected in a directed manner to the source Russian Facebook Ad entity. Each Tineye Result node contains the following data:

* a count of the total number of matches
* a direct URL to each matching image
* the URL of the page where each match was found
* if the source is a collection or stock site
* the score for the individual match
* a link to the ‘compare images’ overlay image

Conveniently, if two discrete ads returned a Tineye match to the same exact URL and Crawl Date, both Russian Facebook Ad entities will be linked to the same Tineye Result node.

In order to visualize the results of the searches outside of Maltego XL, I export selections from the large map using Maltego XL's "Export Graph to Table" function. I exported each selection using the option "Entity property flat map (machine readable)" which produces a formatted CSV file. I created a data flow using parabola.io in order to automatically format the Maltego XL formatted CSV into a separate CSV file formatted for import into [node visualization software Kumu.](http://www.kumu.io) which I used to create the embedded visualizations below.


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRc8CXsjVpAa_KuIuzVLSmFqZEd5Y1utYurtVPRIfXRoBc3BV4HVOIQptcW5MEFy4a2krARuxo-is1T/embed?start=true&loop=true&delayms=600000000" frameborder="0" width="940" height="600" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

##4. Conclusions:

The dataset produced three patterns of Russian memetic content distribution:

<iframe src="https://embed.kumu.io/3a45c7ef46757f7c698f3d03a942eee9"
  width="940" height="600" frameborder="0">
</iframe>

<iframe
  src="https://embed.kumu.io/013dd860a9fafadcb7110b66dddc7a45"
  width="940" height="600" frameborder="0"></iframe>

<iframe
  src="https://embed.kumu.io/3f1a59014fe0d26917d7c29c9605354f"
  width="940" height="600" frameborder="0"></iframe>


The IRA effectively weaponized Poe’s Law to build channels of distribution which propagated inflammatory misinformation to susceptible audiences. These patterns follow the following steps:

1. Produce a Target Demographic

2. Research the Target Demographic

3. Create a manifest of content sources which the target engages with passionately
Extracting content from verified sources provides credibility to fabricated sources when compared side by side (“this page of unknown ownership is showing me the same content as Buzzfeed, it must be credible”)

4. Extract text and images from those sources
Creating remixed content from publicly available sources reduces paper trail (not having to buy stock photos, or attribute photographs)

5. Create state-owned original content and distribution channels mimicking original content and distribution channels (pastiche/parody)

6. Seed a target demographic using paid ads
Sponsored posts forced into news feed interpolates seed content alongside native posts
Poe’s Law describes the act of mistaking seed content for native content
Ads ran for 24 -72 hours at a time, similar to how inflammatory Twitter accounts stay up long enough to be screenshotted

7. Recruit audience members to that page
Convert impressions into traditional ad clicks and page likes
They built brand identity and audience through memetic distribution; i.e, a more valuable goal was for users to screenshot the image, share it to their own pages, and convert their followers by promoting the branded content in a peer-to-peer fashion

8. Promote misinformation through “severed seeding”
Once an audience member is part of a community, discredit factual/mainstream media outlets, promote conspiracy and skepticism of other channels;
Call to action: Spur audience members to seek out their own information and independent research while simultaneously discrediting proper outlets “check everything you read” “do your own research” “take the red pill” “down the rabbit hole”

<iframe
  src="https://embed.kumu.io/cd15a48d54279cf2e392e5b773085168"
  width="940" height="600" frameborder="0"></iframe>

<iframe
  src="https://embed.kumu.io/ffbfbbc0573cfb8e276be9814416d092"
  width="940" height="600" frameborder="0"></iframe>
  
  <iframe
  src="https://embed.kumu.io/d9cf906c28a0e98bef625a33f87a8236"
  width="940" height="600" frameborder="0"></iframe>
  
  <iframe
  src="https://embed.kumu.io/72dce67bfa21f724d9d2abbbf8f507c9"
  width="940" height="600" frameborder="0"></iframe>

## Definitions:

Virality: *“a word-of-mouth-like cascade diffusion process wherein a message is actively forwarded from one person to other, within and between multiple weakly linked personal networks, resulting in a rapid increase in the number of people who are exposed to the message.”*  

*Key Features:*
* (1) a person-to-person mode of diffusion; 
* (2) great speed, which is enhanced by social media platforms; and 
* (3) broad reach, which is achieved by bridging multiple networks.

Link Rot: *Link rot (or linkrot) is the process by which hyperlinks on individual websites or the Internet in general tend to point to web pages, servers or other resources that have become permanently unavailable.*

Meme Page: *An internet account, page, group, or forum, specifically dedicated to sharing relevant internet memes, generally based around a certain theme, topic, or performance.*

Memetic Distribution: *the act of propagating a meme to various persons or groups via strong and weakly linked social networks; the physical file is the one passed around, not just a link. usually through direct transmission of a file without alteration (texting the image to someone, , screenshotting or screen recording and sending the file*

Artifacts of Distribution: visual embodiments of memetic propagation, including but not limited to crop edits, watermarks, changes in compression, filtering, attempted removal of identifiable information (scratching out usernames or faces in a screenshot). These artifacts pile onto memes in an archaeological manner. 

Evergreen Media: *the act of resurfacing available internet media posted previously* 

Deep Fried Meme: *a style of meme wherein an image is run through dozens of filters to the point where the image appears grainy, washed-out, and strangely colored*

Screenshot: *an image that shows the contents of a computer display*

ScreenLife: *a storytelling framework for the creation of content, generally among the mediums of videos and film, which tells a complete narrative within the confines of a digital screen utilizing apps, websites, software functions, and internet-connected experiences. It’s main idea is that everything that the viewer sees happens on the computer, tablet or smartphone screen. All the events unfold directly on the screen of your device. Instead of film set — there’s a desktop, instead of protagonist’s actions — a cursor. ScreenLife content is created entirely within the confines of a digital device, often mirroring the screen the protagonist views.*

F-Shaped Pattern for Reading Web Content: *Eyetracking visualizations show that users often read Web pages in an F-shaped pattern: two horizontal stripes followed by a vertical stripe.*

Poe's Law: *an Internet axiom which states that it is difficult to distinguish extremism from satire of extremism on the Internet unless the author clearly indicates his/her intent. This notion is most frequently observed with highly polarized discussion topics, such as gender equality, religious or political fundamentalism and other social justice-related issues.*

Morgan's Corollary to Godwin's Law: *As soon as such a comparison occurs, someone will start a Nazi-discussion thread on alt.censorship.*

DarkShikari's Theorem: *Any community that gets its laughs by pretending to be idiots will eventually be flooded by actual idiots who mistakenly believe that they're in good company.*

Emoji: *pictographs (pictorial symbols) that are typically presented in a colorful form and used inline in text. They represent things such as faces, weather, vehicles and buildings, food and drink, animals and plants, or icons that represent emotions, feelings, or activities.  To the computer they are simply another character, but people send each other billions of emoji everyday to express love, thanks, congratulations, or any number of a growing set of ideas.*

Blind/Referenceless Image Spatial QUality Evaluator (BRISQUE): *Blind/Referenceless Image Spatial QUality Evaluator (BRISQUE) is a natural scene statistic (NSS)-based distortion-generic blind/no-reference (NR) image quality assessment (IQA) model which operates in the spatial domain. It does not compute distortion specific features such as ringing, blur or blocking, but instead uses scene statistics of locally normalized luminance coefficients to quantify possible losses of ‘naturalness’ in the image due to the presence of distortions, thereby leading to a holistic measure of quality.

Butteraugli: *a project that estimates the psychovisual similarity of two images. It gives a score for the images that is reliable in the domain of barely noticeable differences. Butteraugli not only gives a scalar score, but also computes a spatial map of the level of differences.*

