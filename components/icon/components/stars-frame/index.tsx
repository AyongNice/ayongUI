import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Stars = (props: IconProps) => {
    const {className = "", style = {}, onClick = () => {}} = props;
    const styleClassName: string = `${icon.default} ${className}`;
    return (
        <svg
            viewBox="0 0 1024 1024"
            className={styleClassName}
            style={{
                fill: style.color,
                ...style,
            }}
            onClick={onClick}
            focusable="false"
            data-icon="ayong"
        >
            <path d="M511.982933 206.711467c7.918933 0 15.086933 4.232533 18.295467 10.752l84.753067 172.066133c4.9152 9.949867 14.557867 16.861867 25.668266 18.4832l195.003734 28.381867c7.3216 1.058133 13.602133 5.973333 15.872 12.407466a16.964267 16.964267 0 0 1-4.420267 17.937067l-142.865067 139.554133a32.8704 32.8704 0 0 0-9.5232 29.064534l33.092267 193.536c1.1776 6.741333-1.860267 13.431467-7.748267 17.408a21.333333 21.333333 0 0 1-12.014933 3.6352c-3.515733 0-6.980267-0.8704-9.966933-2.4064l-169.984-89.5488a35.089067 35.089067 0 0 0-32.290134 0l-169.796266 89.480533a22.272 22.272 0 0 1-10.171734 2.474667 21.504 21.504 0 0 1-11.810133-3.498667c-6.058667-4.096-9.130667-10.837333-7.953067-17.5616l33.1264-193.501867a32.8704 32.8704 0 0 0-9.540266-29.064533l-142.8992-139.588267a16.896 16.896 0 0 1-4.4032-17.8176c2.286933-6.519467 8.5504-11.434667 15.940266-12.4928l194.935467-28.381866a33.9456 33.9456 0 0 0 25.685333-18.4832l84.701867-172.032c3.242667-6.570667 10.4448-10.8032 18.312533-10.8032m0-33.28c-20.957867 0-40.021333 11.52-48.964266 29.576533l-84.736 172.066133-194.935467 28.3648c-20.036267 2.8672-36.693333 16.315733-43.127467 34.56a49.7152 49.7152 0 0 0 12.578134 52.309334l142.848 139.554133-33.1264 193.4848c-3.362133 19.524267 5.256533 39.048533 22.186666 50.4832a56.2688 56.2688 0 0 0 31.163734 9.4208 57.002667 57.002667 0 0 0 26.197333-6.4L512 787.336533l169.966933 89.514667a56.593067 56.593067 0 0 0 26.112 6.4c10.990933 0 21.8624-3.208533 31.1808-9.4208 16.913067-11.434667 25.531733-30.958933 22.186667-50.4832l-33.092267-193.4848 142.865067-139.554133a49.783467 49.783467 0 0 0 12.544-52.309334c-6.468267-18.244267-23.125333-31.675733-43.1616-34.56l-194.9184-28.3648-84.753067-172.066133c-8.840533-18.056533-27.9552-29.576533-48.9472-29.576533z"/>
            <path d="M708.078933 887.517867c-9.728 0-19.456-2.389333-28.091733-6.877867L512 792.149333 344.064 880.64c-19.387733 10.052267-43.707733 8.772267-61.713067-3.242667-18.500267-12.4928-27.6992-33.467733-24.029866-54.766933l32.750933-191.266133-141.243733-137.984c-15.4112-15.0016-20.6336-36.7616-13.6192-56.7808 7.031467-19.933867 24.866133-34.2528 46.5408-37.376L375.466667 371.182933l83.746133-170.052266c9.608533-19.421867 30.327467-31.965867 52.7872-31.965867 22.545067 0 43.281067 12.544 52.7872 31.982933L648.533333 371.182933l192.699734 28.040534c21.6576 3.106133 39.492267 17.425067 46.574933 37.358933 7.0144 20.002133 1.809067 41.762133-13.585067 56.797867l-141.2608 137.984 32.7168 191.2832c3.669333 21.282133-5.5296 42.274133-23.995733 54.7328a60.450133 60.450133 0 0 1-33.604267 10.1376zM512 782.523733l1.9968 1.041067 169.966933 89.514667a52.957867 52.957867 0 0 0 52.957867-2.781867c15.616-10.5472 23.415467-28.2624 20.343467-46.216533L723.780267 628.394667l144.469333-141.124267c13.0048-12.6976 17.408-31.0272 11.502933-47.854933-5.9904-16.913067-21.213867-29.0816-39.7312-31.744l-197.154133-28.689067-85.742933-174.08c-8.106667-16.520533-25.8048-27.204267-45.124267-27.204267-19.234133 0-36.9664 10.683733-45.141333 27.204267l-85.725867 174.08-197.154133 28.689067c-18.5344 2.6624-33.757867 14.830933-39.714134 31.744-5.905067 16.8448-1.4848 35.1744 11.537067 47.837866l144.452267 141.124267-33.501867 195.6864c-3.106133 17.954133 4.7104 35.652267 20.3776 46.2336 15.428267 10.308267 36.369067 11.383467 52.992 2.7648L512 782.523733z m196.078933 71.68c-4.130133 0-8.260267-1.006933-11.912533-2.8672l-170.018133-89.582933a31.061333 31.061333 0 0 0-28.347734 0.017067l-169.7792 89.463466a26.624 26.624 0 0 1-26.333866-1.245866c-7.492267-5.085867-11.246933-13.448533-9.7792-21.845334l33.109333-193.4848a28.672 28.672 0 0 0-8.311467-25.2928l-142.8992-139.588266a21.1456 21.1456 0 0 1-5.444266-22.289067c2.816-8.004267 10.410667-14.011733 19.3536-15.291733l194.9184-28.381867a29.6448 29.6448 0 0 0 22.4768-16.145067l84.701866-172.032c3.925333-8.004267 12.612267-13.1584 22.1184-13.1584 9.5232 0 18.210133 5.154133 22.1184 13.141334l84.753067 172.066133a29.696 29.696 0 0 0 22.442667 16.145067l195.003733 28.381866c8.891733 1.28 16.469333 7.253333 19.268267 15.223467 2.7648 7.867733 0.682667 16.452267-5.461334 22.408533l-142.848 139.537067c-6.7584 6.587733-9.864533 16.042667-8.2944 25.2928l33.092267 193.536c1.4848 8.362667-2.184533 16.6912-9.5744 21.6576a25.514667 25.514667 0 0 1-14.353067 4.334933z m-196.096-104.448c6.263467 0 12.526933 1.536 18.1248 4.4544l170.001067 89.565867c5.461333 2.781867 12.544 2.440533 17.6128-1.006933a13.124267 13.124267 0 0 0 5.9392-13.141334L690.568533 636.074667a37.137067 37.137067 0 0 1 10.734934-32.836267l142.865066-139.554133a12.7488 12.7488 0 0 0 3.362134-13.482667c-1.723733-4.932267-6.741333-8.789333-12.4416-9.591467l-195.0208-28.381866a38.263467 38.263467 0 0 1-28.859734-20.821334l-84.770133-172.0832c-2.491733-5.085867-8.174933-8.362667-14.455467-8.362666s-11.946667 3.293867-14.472533 8.3968l-84.701867 172.032a38.161067 38.161067 0 0 1-28.910933 20.821333l-194.9184 28.381867c-5.8368 0.836267-10.752 4.625067-12.526933 9.6768a12.714667 12.714667 0 0 0 3.362133 13.3632l142.8992 139.588266a37.205333 37.205333 0 0 1 10.752 32.836267l-33.1264 193.501867c-0.887467 5.0688 1.467733 10.171733 6.126933 13.312 4.829867 3.2256 12.117333 3.618133 17.629867 0.785066l169.762133-89.463466c5.632-2.901333 11.8784-4.437333 18.1248-4.437334z"/>
        </svg>
    );
};

export default Stars;
