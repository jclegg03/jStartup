# CS 260 Notes

[My startup](https://goalz.click)

## Useful Commands
 - `mkdir` ***m***a***k***es a new ***dir***ectory
 - `git pull` ***pull***s the repository down to the local device
 - `git commit -am [commit message]` ***commit***s the changes on the local device to the local git
 - `git push` ***push***es the local committed changes to the online repository
 - `git fetch` pulls the online version without changing your code
 - `git status` will tell you how your current local repository compares to the fetched repository
 - `shift + insert` will paste copied text


## Helpful links
- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Markup Documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## AWS Notes
- Route 53 is used to rent the domain from the DNS
> [!IMPORTANT]
> Respond to the email within 15 days
- EC2 is used to get the IP address
- This [link](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md) explains how to set up HTTPS protocol because your browser will scream at you for using HTTP


## HTML Notes
- HTML gets turned into a tree structure called the DOM or Document Object Model


## CSS Notes
- Select an element to modify in general by using the tag
`<p style="color: blue;">some text here</p>`
- Inside the block set attributes for all those elements
```
<style>
  p {
   color: red;
  }
</style>
```
- You can also modify an individual element in that line of HTML which overrides the general rule
