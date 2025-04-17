const core = require('@actions/core');
//const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    //1. Get action input values.
    const bucketName = core.getInput('s3-bucket-name', { required: true });
    const bucketRegion = core.getInput('s3-bucket-region', { required: true });
    const websiteFolder = core.getInput('website-folder', { required: true });

    //2. Upload website to S3 bucket.
    const s3Uri = `s3://${bucketName}`;
    exec.exec(`aws s3 sync ${websiteFolder} ${s3Uri} --region ${bucketRegion}`);

    //set website url as an output. 
    const websiteURL = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', websiteURL)

    core.notice("Website deployed successfully into S3 bucket.");

}

run();