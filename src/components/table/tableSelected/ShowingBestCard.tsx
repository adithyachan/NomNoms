const compareByRating = (a: any, b: any) => {
    return b.rating - a.rating;
};

const compareByReview = (a: any, b: any) => {
    return b.review_count- a.review_count;
};

export default function BestCard(props : {preview : any,value : any}) {
    console.log(props.value)
    let sortedPreview = []
    if (props.value == "rated") {
      sortedPreview = [...props.preview].sort(compareByRating);
    } else if (props.value == "review") {
      sortedPreview = [...props.preview].sort(compareByReview);
    }
    if (sortedPreview.length === 0) {
      return (<>Unable to display card</>)
    }
    const some = sortedPreview[0].name
    return (<>{some} Hello</>);
}