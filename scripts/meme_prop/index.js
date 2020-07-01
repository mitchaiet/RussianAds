function anim(sel, len, namespace, attr, value) {
    return (sel.transition(len)[namespace](attr, value))
}

class Zoom {
    
    constructor({ target }) {
        this.target = target
        this.zoom = d3.zoom()
            .on('zoom', () => {
           
                const { transform } = d3.event

                d3.select('#transform-group')
                    .attr('transform', transform)
            })
        this.target.call(this.zoom)
        this.origin = this.zoomToFit(['transform-group'])
    }

    onId(id) {
        
        const zoomOn = this.target.select(`#${id}`)
        const zoomCoords = this.zoomToFit(zoomOn)

        this.target.transition()
            .duration(600)
            .call(d3.zoomIdentity,
                this.zoom
                    .scale(zoomCoords.k)
                    .translate(zoomCoords.x, zoomCoords.y))
    }

    off() {
        
        this.target.transition()
              .duration(600)
              .call(d3.zoomIdentity,
                this.zoom.scale(this.origin.k))
    }

    offOfOnTo(id) {
        this.off().end(this.onId(id))
    }

    reset() {
        
        this.target.transition()
            .duration(600)
            .call(d3.zoomIdentity,
            this.zoom.scale(this.origin.k)
                .translate(this.origin.x, this.origin.y))
    }

    zoomToFit(ids) {

        let bbox = { x : Infinity, y : Infinity, x1 : -Infinity, y1 : -Infinity }

        ids.forEach(id => {
            
            const cbox = d3.select(`#${id}`).node().getBBox()
            const x1 = cbox.x + cbox.width
            const y1 = cbox.y + cbox.height

            bbox.x > cbox.x && (bbox.x = cbox.x)
            bbox.y > cbox.y && (bbox.y = cbox.y)
            bbox.x1 < x1 && (bbox.x1 = x1)
            bbox.y1 < y1 && (bbox.y1 = y1)
        })

        const width = bbox.x1 - bbox.x,
              height = bbox.y1 + bbox.y,
              midX = bbox.x + width / 2,
              midY = bbox.y + height / 2,
              fullWidth = this.target.node().clientWidth,
              fullHeight = this.target.node().clientHeight
        
        if (!width || !height) {
            return ;
        }

        const fh = ids[0] === 'transform-group' ? fullHeight / 2 : fullHeight / 1.25
        const padding = 0.9
        const scale =  padding / Math.max(width / fullWidth, height / fullHeight)
        const translate = [fullWidth / 2 - scale * midX, fh - scale * midY]
       
        this.target.transition()
            .duration(600)
            .call(this.zoom.transform,
            d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
    }
}

const slides = []
const nameToId = {
    'lopez' : 'eeyig',
    'redass' : 'kpsdy',
    'hornsy' : 'yjfyd',
    'chugging' : 'ncmqb',
    'mitch' : 'kmwnm',
    'worthington' : 'icron',
    'xavier' : 'gebpj',
    'chloe' : 'gzspw',
    'saul' : 'fdaxi',
    'notgay' : 'zzkah',
}

const flipO = i => {
           
    let o = {}
    Object.keys(i).forEach(k => o[i[k]] = k)
    return o
}

const idToName = flipO(nameToId)

slides[0] = {
    ids : ['redass', 'hornsy', 'chugging'],
    content : '<h3>University Meme Groups</h3>'
}

slides[1] = {
    ids : ['hornsy'],
    content : `<div class="article-block"> <header> <h1 class="title">UT LONGmemes For HORNSy Teens</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>The University of Texas at Austin is home to one of the largest college-affiliated meme groups on Facebook, <b>UT LONGmemes For HORNSy Teens</b>. </p> <p>With 41,457 members at the time of writing, the group encapsulates 80.39% of the 51,832 students of the combined undergraduate and graduate student body enrolled in Fall 2018.</p> </div> </div>`,
}

slides[2] = {
    ids : ['redass'],
    content : `<div class="article-block">     <header>       <h1 class="title">Aggie Memes for Redass Teens</h1>       <h3 class="subtitle"></h3>     </header>      <div class="markdown-container"><p>At Texas A&amp;M University, the longtime rival school of The University of Texas at Austin, <b>Aggie Memes for Redass Teens</b> contains 25,499 members, which encapsulates 39.3% of the school’s 64,882 students enrolled in the Spring 2019 student body. </p> </div>   </div>`,
}

slides[3] = {
    ids : ['chugging'],
    content : `<div class="article-block"> <header> <h1 class="title">UW-Madison Memes for Milk-Chugging Teens </h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>The University of Wisconsin-Madison is home to <b>UW-Madison Memes for Milk-Chugging Teens</b> which hosts 24,522 members, 80.7% of the school’s 30,360 undergraduate class of Fall 2018. </p> </div> </div>`,
}

slides[4] = {
    ids : ['mitch'],
    content : `<div class="article-block"> <header> <h1 class="title">Mitch Chaiet - Original Post</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>On November 29, 2017, Mitch Chaiet, a student of the University of Texas, created an image in Photoshop. The image was a joke about men on college campuses who ride two at a time on small scooters called the Honda Ruckus. </p> <p>He posted it in his college meme group, knowing that other students at the University of Texas would resonate with the joke. </p> </div> </div>`
}

slides[5] = {
    ids : ['mitch', 'hornsy'],
    content : `<div class="article-block"> <header> <h1 class="title">Original Post (OP)</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>The post quickly rose in popularity within the University of Texas meme group, UT LONGmemes for HORNSY Teens. The post peaked at 3,400 likes, capturing a positive reaction from 8.2% of the group's 41,457 members.</p> <p>Mitch attributed the post to himself, foreshadowing that the image would spread and be edited. He included a watermark, placing his initials "mc" in the white shadow on the right border of the inlaid image.</p> <p><img src="images/meme_prop/op_fb_mitch.png" alt="StrictlyPlatonicUT1Cropped"></p> </div> </div>`
}

slides[6] = {
    ids : ['worthington'],
    content : `<div class="article-block"> <header> <h1 class="title">Michael Worthington Screenshot</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p><img src="images/meme_prop/aggie_redass_worth.png" alt="StrictlyPlatonicMichaelWorthington"></p> <p>Michael Worthington, another student at the University of Texas, noticed that the original image had been <b>downloaded and reuploaded (a form of "repost")</b> to Aggie Memes for Redass Teens by a student named Xavier Lozano. </p> <p>Michael was a member of both the University of Texas group and the Texas A&amp;M Group, while Mitch was not. Therefore, he had <b>access</b> to Xavier's post. </p> <p>Michael subsequently screenshotted the post in the Aggie Meme group and posted the image as a comment on the original post (OP) in the University of Texas meme group, creating an <b>intertextual link of attribution</b> - he spotted the image in a discrete online space, and created a "bridge" between the two posts. This action is akin to citing a source.</p> </div> </div>`
}

slides[7] = {
    ids : ['xavier', 'redass'],
    content : `<div class="article-block"> <header> <h1 class="title">Xavier Lozano - Repost to A&amp;M</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>Xavier Lozano, who reposted Mitch's original work to the Texas A&amp;M page, did not credit Mitch as the creator of the original image - he simply uploaded the image without a caption. However, Mitch's watermark (the "mc") was still present within the reposted image, maintaining <b>attribution</b> of the image.</p> <p>However, since Xavier Lozano was the person who posted the image in Aggie Memes for Redass Teens, he controlled the comments, received social credit  (colloquially referred to as "clout") for the popularity of the image, and whether the image stayed accessable to members of the group (or got deleted) was solely up to him. This power denotes <b>ownership</b>.</p> <p>Since Xavier did not explicitly cite a source for where he was able to download the image in order to repost it, we can assume he was also a member of UT LONGmemes for HORNSy Teens, like Michael Worthington and Mitch. In addition, he was simultaneously a member of Aggie Memes for Redass Teens, and knew that this particular image had not been propagated to that space yet. This denotes <b>access</b>.</p> <p><img src="images/meme_prop/aggie_lozano.png" alt="StrictlyPlatonicAM"></p> </div> </div>`
}

slides[8] = {
    ids : ['xavier', 'redass', 'mitch', 'hornsy'],
    content : `<div class="article-block"> <header> <h1 class="title">Xavier Lozano - Repost to A&amp;M</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/StrictlyPlatonicAMComment1.png?raw=true" alt="StrictlyPlatonicAMComment1"></p> <p>Immediately, members of Aggie Memes for Redass Teens begin to <b>attribute</b> the image back to its original source, Mitch Chaiet's Original Post in UT LONGmemes for HORNSy Teens. Since Xavier did not provide <b>attribution</b> as to where he originally downloaded <b>("sourced")</b> the image, commenters who also had <b>access</b> to the UT group <b>attributed</b> the image back to the source for him.<br>.  </p> </div> </div>`
}

slides[9] = {
    ids : ['chugging', 'xavier', 'redass'],
    content : `<div class="article-block"> <header> <h1 class="title">Xavier Lozano - Repost to A&amp;M</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>Immediately, Xavier responds, stating he <b>sourced</b> the image from the University of Wisconsin's (UW) meme group. </p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/StrictlyPlatonicAMComment2.png?raw=true" alt="StrictlyPlatonicAMComment2"></p> <p>Initially, we assumed he <b>sourced</b> the image from the UT meme group, UT LONGmemes for HORNSy Teens. However, it appears someone else has <b>propagated</b> the image to the UW page beforehand.</p> <p>Note, a commenter states that "not everyone is part of the UT page" - denoting <b>access.</b></p> <p>Xavier Lozano has <b>attributed</b> the <b>source</b> of his <b>repost</b> to the University of Wisconsin-Madison's meme group, UW-Madison Memes for Milk-Chugging Teens, meaning he has <b>access</b> to both spaces and is able to shift information from one to another. By propagating an image and creating a new post in Aggie Memes for Redass Teens, he is given <b>ownership</b> of that image in that space. </p> </div> </div>`
}

slides[10] = {
    ids : ['chugging', 'xavier'],
    content : `<div class="article-block"> <header> <h1 class="title"></h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>Xavier Lozano stated that he sourced the image from UW-Madison Memes for Milk Chugging Teens. </p> <p>Who posted it there, and where did they source the image from?</p> <p>Finding the post in the UW group is a study of <b>audience reactions</b> and <b>intertextual links.</b></p> <blockquote> <p><b>Intertextuality</b> is the shaping of a text's meaning by another text. It is the <b>interconnection between similar or related works of literature that reflect and influence an audience's interpretation of the text.</b> Intertextual figures include: allusion, quotation, calque, plagiarism, translation, pastiche and parody. - Wikipedia</p> </blockquote> <p>For the purposes of the following analyses, I define an intertextual link under the following contexts:</p> <ul> <li><p>Each Facebook post, including comments, is it’s own “text”</p> </li> <li><p>A comment referencing another “text” creates an intertextual link between those two texts; these links can be created by:</p> </li> </ul> <ol> <li>the commenting of a URL to another post or video</li> <li>tagging a relevant person, group, or media</li> </ol> <ul> <li>posting a screenshot of one text in the comments of another text</li> <li>quoting/referencing the other text in a comment. </li> </ul> <p>Practical examples of intertextual links:</p> <ul> <li><p>Two Facebook posts in two discrete groups containing the same image</p> </li> <li><p>Multiple commenters linking to a specific URL of a YouTube video in the same post</p> </li> <li><p>A repeated action by members of discrete audiences viewing the same content in different locations, spaces, or groups</p> </li> </ul> </div> </div>`
}

slides[11] = {
    ids : ['mitch', 'hornsy'],
    content : `<div class="article-block"> <header> <h1 class="title">UT Audience Reactions</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>Going back to the original post in UT LONGmemes for HORNSy Teens, we can begin to see how the audience begins to create intertextual links between discrete media.</p> <p>We begin to see audience members reference the following Vine video created by Anthony Padilla, creating an intertextual link via two different methods:</p> <ol> <li>Referencing the lyrical content of the video</li> <li>Providing a URL to a hosted form of the video</li> </ol> <p><video width="100%" controls=""><source src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation Assets/StrictlyPlatonic/HotTubVineAnthonyPadilla.mp4?raw=true" type="video/mp4">Your browser does not support HTML5 video.</video></p> <p>In addition, audience members <b>remix</b> their reference to the Vine by shifting the lyrical content to include references to Mitch's image.</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink1.png?raw=true" alt="UTIntertextualLink1"></p> <p>Karishma Bajaj posts an image he took of two men on a Honda Ruckus. </p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink2.png?raw=true" alt="UTIntertextualLink2"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink3.png?raw=true" alt="UTIntertextualLink3"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink4.png?raw=true" alt="UTIntertextualLink4"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink5.png?raw=true" alt="UTIntertextualLink5"></p> <p>Kaylee Clark Schnur references a Facebook Group dedicated to posting pictures of two men on a Honda Ruckus. However, she does not provide a link or tag the group, creating an issue of <b>access</b>.</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink6.png?raw=true" alt="UTIntertextualLink6"></p> <p>However, in a separate comment reply, Huy Lam tags the group Kaylee was referencing. This group - <a href="https://www.facebook.com/groups/318339301897483/?hc_location=ufi">NOT GAY</a> - is dedicated to posting pictures of 2 men on scooters. </p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink19.png?raw=true" alt="UTIntertextualLink19"></p> <p>More references to Anthony Padilla's Vine:</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink7.png?raw=true" alt="UTIntertextualLink7"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink8.png?raw=true" alt="UTIntertextualLink8"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink9.png?raw=true" alt="UTIntertextualLink9"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink10.png?raw=true" alt="UTIntertextualLink10"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink11.png?raw=true" alt="UTIntertextualLink11"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink12.png?raw=true" alt="UTIntertextualLink12"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink13.png?raw=true" alt="UTIntertextualLink13"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink14.png?raw=true" alt="UTIntertextualLink14"></p> <p>Abigail Fonseca and Kierra Boyle provide higher quality references to the Vine, by providing a URL. This allows viewers of the comment to easily <b>access</b> the referenced media.</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink15.png?raw=true" alt="UTIntertextualLink15"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink16.png?raw=true" alt="UTIntertextualLink16"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink17.png?raw=true" alt="UTIntertextualLink17"></p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/UTIntertextualLinks/UTIntertextualLink18.png?raw=true" alt="UTIntertextualLink18"></p> </div> </div>`
}

slides[12] = {
    ids : ['xavier', 'redass'],
    content : `<div class="article-block"> <header> <h1 class="title">Texas A&amp;M Audience Reactions</h1> <h3 class="subtitle"></h3> </header> <div class="markdown-container"><p>We begin to see that a completely different audience, presented with the same piece of media, with absolutely no knowledge of how the previous audience reacted, repeats the same action of intertextual reference and remix. </p> <p>Gabie Nguyen provides a URL to Twitter account <a href="https://twitter.com/2dudes1scoot">@2Dudes1Scoot</a> which is dedicated to the curation and sharing of images and videos of 2 men on a single scooter.</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/AMIntertextualLinks/AMIntertextualLink1.png?raw=true" alt="AMIntertextualLink1"></p> <p>W Travis Reichel provides a link to the previously referenced Vine, while Lauren Ferris and Allison Van Cleve simply reference the lyrics of the Vine, remixing them to conform the the context of 2 men on a scooter.</p> <p><img src="https://github.com/mitchaiet/RussianAds/blob/master/Presentation%20Assets/StrictlyPlatonic/AMIntertextualLinks/AMIntertextualLink2.png?raw=true" alt="AMIntertextualLink2"></p> </div> </div>`
}

slides[13] = {
    ids : ['chugging'],
    content : `<div class="article-block"<header><h1 class="title">UW Audience Reactions</h1>
    <p>In order to find the person who posted the meme into UW, we must first find the post containing the meme.
    A search for “strictly platonic” - a phrase embedded within the image and not machine readable - produces no results.</p>
   <p><img src="https://media.githubusercontent.com/media/mitchaiet/RussianAds/master/Presentation%20Assets/StrictlyPlatonic/UWIntertextualLinks/UWIntertextualLink1.png" alt="UW intertextual link"></p>
   A search for “honda ruckus” - the main object associated with the meme - produces no results.
   <p><img src="https://media.githubusercontent.com/media/mitchaiet/RussianAds/master/Presentation%20Assets/StrictlyPlatonic/UWIntertextualLinks/UWIntertextualLink2.png"></img></p>
   <p>A search for “hot new adult novel” - the machine-readable caption associated with the original posting of the meme - produces no results.</p>
   <p><img src="https://media.githubusercontent.com/media/mitchaiet/RussianAds/master/Presentation%20Assets/StrictlyPlatonic/UWIntertextualLinks/UWIntertextualLink3.png"></img></p>
   <p>A search for “not gay” - a phrase stemming from audience reactions referencing the secondary Anthony Padilla hot tub vine - reveals the meme as the first result.</p>
   </p><img src="https://media.githubusercontent.com/media/mitchaiet/RussianAds/master/Presentation%20Assets/StrictlyPlatonic/UWIntertextualLinks/UWIntertextualLink4.png"></img></p>
   </div>`
}

class Deck {

    constructor({
        targetSel,
        contentHeaderId,
        contentWrapperId,
        slides,
    }) {

        this.target = targetSel
        this.slides = slides
        this.contentWrapper = d3.select('#' + contentWrapperId)
        this.contentHeader = d3.select('#' + contentHeaderId)
        this.zoom = new Zoom({ target : this.target })
        this.currIdx = null
    }

    present() {
        this.zoom.reset()
        this.next()
    }

    getNextIdx(dir) {

        const idx = this.currIdx === null ? 0 : this.currIdx + dir

        return (
            idx === this.slides.length
            ? 0
            : idx < 0
            ? this.slides.length - 1
            : idx )
    }

    hide(elem) {
        return (anim(elem, 600, 'style', 'opacity', 0))
    }

    show(elem) {
        return (anim(elem, 600, 'style', 'opacity', 1))
    }

    getCurrSlide() {
        return this.slides[this.currIdx]
    }

    setHeader(header) {

        const hw = this.contentHeader
        const showNewHeader = () => {
            hw.node().innerHTML = header
            this.show(hw)
        }

        !hw.node().innerHTML
        ? showNewHeader()
        : this.hide(hw).on('end', showNewHeader)
    }

    setContent(content) {

        const cw = this.contentWrapper
        const showNewContent = () => {
            d3.select('#content-frame').node().scrollTop = 0
            cw.node().innerHTML = content

            cw.selectAll('img').each(function() {
                
                const img = d3.select(this)
                
                if (img) {
                    const a = d3.create('a')
                        .attr('target', '_blank')
                        .attr('href', img.attr('src'))

                        a.append('img').attr('src', img.attr('src'))
                        
                        const p = img.node().parentNode

                        img.remove()
                        p.appendChild(a.node())
                }
            })

            this.show(cw)
        }

        !cw.node().innerHTML
        ? showNewContent()
        : this.hide(cw).on('end', showNewContent)
    }

    blur(elem) {
        return (anim(elem, 600, 'style', 'opacity', 0.15)) 
    }

    focus(ids) {
        
        const show = this.show
        const blur = this.blur
        
        d3.selectAll('.edge').filter(function () {
                
            const edge = d3.select(this)
            const sid = edge.attr('source-id')
            const tid = edge.attr('target-id')
            const tib = ids.indexOf(sid) > -1 && ids.indexOf(tid) > -1
            
            tib ? show(edge) : blur(edge)
        })

        d3.selectAll("g[id^='node-group-']")
        .each(function() {
        
            const nodeGroup = d3.select(this)
            const inReqIds = ids.indexOf(nodeGroup.attr('id').split('node-group-')[1]) > -1

            inReqIds ? show(nodeGroup) : blur(nodeGroup)
        })
    }

    setNextSlide(dir) {

        const nextIdx = this.getNextIdx(dir)
        const nextSlide = this.slides[nextIdx]
        const goNext = () => {

            nextSlide.header && this.setHeader(nextSlide.header)
            nextSlide.content && this.setContent(nextSlide.content)

            this.zoom.zoomToFit(nextSlide.ids)
            this.currIdx = nextIdx
            this.focus(nextSlide.ids)
        }

        const nb =  d3.select('#next-button')

        switch(nextIdx) {
            case 0:
               nb.html('→')
               break ;
            case this.slides.length - 1 :
                nb.html('Restart ↺')
                break ;
            default :
                nb.html('←')
        }
       
        goNext()
    }

    next() {
        this.setNextSlide(+1)
    }

    prev() {
        this.setNextSlide(-1)
    }
}

(() => {
    
    //init base svg
    const contentWrapperId = 'content-wrapper'
    const contentHeaderId = 'content-header'
    const svgDoc = new DOMParser().parseFromString(baseGraph, 'text/xml')
    const svgNode = svgDoc.firstChild

    //add to DOM
    const wrapper = d3.select('#meme-prop-wrapper').node()

    wrapper.appendChild(svgNode)

    //init presentation 
    slides.forEach(slide => slide.ids = slide.ids.map(name => nameToId[name]))
    const deck = new Deck({
        targetSel : d3.select(svgNode),
        contentWrapperId,
        contentHeaderId,
        slides,
    })

    const cf = d3.select('#content-frame')

        cf
        .style('max-height', d3.select(svgNode).style('height'))
        .style('height', '100%')
        .style('width', d3.select(svgNode).style('width'))
        .style('background-image', 'url(images/meme_prop/ruckus.png)')
        .style('background-blend-mode', 'lighten')

    const header = cf.append('div')
            .attr('style', 'display:flex;justify-content:center;flex-direction:column;align-items:center;margins:auto;padding:4rem;')
            
            header.append('h1').html('Strictly Platonic: Memetic Propagation Analysis')
            header.append('h2').html('An introduction to the memetic concepts of ownership, attribution, and access.')

    //convert this to <button> 
    const svgWidth = Number(d3.select(svgNode).style('width').split('px')[0])
    const sb = newGraphStartButton(header, 'Start Presentation')
    const i = d3.interpolateString(svgWidth + 'px', svgWidth / 3 + 'px')

    sb.on('click', () => {
        
        const tr = cf.transition().duration(400)
       
        
        deck.hide(header)
        tr.tween('style.width', function() {
            return function (t) {
                d3.select(this).style('width', i(t))
            }
        })
        deck.next()

        cf.style('background-image', '')

        const buttonGroup = d3.create('div').attr('style', 'width:100%;display:flex;')
        
        const pb = buttonGroup.append('button').style('width', '100%').html('←').attr('class', 'pres-cntrl').on('click', () => deck.prev()).node()
        const nb = buttonGroup.append('button').style('width', '100%').html('→').attr('class', 'pres-cntrl').attr('id', 'next-button').on('click', () => deck.next()).node()

        cf.node().prepend(buttonGroup.node())
    })
        
    //reset clip paths to node innerRadius (radius - strokeWidth)
    Object.keys(idToName).map(id => {

        const node = d3.select(`#${id}`)
        const innerRad = node.attr('r') - node.attr('stroke-width')

        d3.select(`#clip-${id}`).select('circle')
            .attr('r', innerRad)
    })

    d3.select(svgNode).select(`#c${nameToId['mitch']}`)
    
    d3.select(svgNode)
        .style('border', 'solid 2px rgb(241, 244, 246)')
        .style('border-radius', '4px')
        .style('box-shadow', '0 -20px -25px -10px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04);')
})()