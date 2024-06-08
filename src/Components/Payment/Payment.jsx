import { Elements } from "@stripe/react-stripe-js";
import Container from "./Container";
import { loadStripe } from "@stripe/stripe-js";
import '../../Components/Payment/Payment.css';

const Payment = ({ singlePrice, data }) => {
    const stripePromise = loadStripe('pk_test_51PBVoLRpKZBTemtIioRu0MG9srbyUguVidzEO6xZhXaqbIudyHdhH7yo7EuRGvv6cIH5KGRuzTqyHJS775M6KtWx00j3tzBa4X');
    console.log(singlePrice);
    console.log(data);
    return (
        <div className="w-3/4 mx-auto my-20">
            <Elements stripe={stripePromise}>
                <Container singlePrice={singlePrice} data={data} ></Container>
            </Elements>
        </div>
    );
};

export default Payment;