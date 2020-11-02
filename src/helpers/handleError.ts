import Swal from 'sweetalert2';
import { ApolloError } from '@apollo/client';

export default function handleError(error: ApolloError | any) {
  console.log({ ...error });
  let title = error;
  title = (error?.graphQLErrors && error.graphQLErrors[0]?.message) || error.message;
  if (error.networkError) console.log(error.networkError?.result?.errors);
  Swal.fire({
    icon: 'error',
    title,
    showConfirmButton: true,
    timer: 6000,
  });
}
