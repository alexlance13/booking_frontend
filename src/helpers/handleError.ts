import { ApolloError } from '@apollo/client';
import Swal from 'sweetalert2';

export default function handleError(error: ApolloError) {
  console.log({ ...error });
  let title = (error?.graphQLErrors && error.graphQLErrors[0]?.message) || error.message || error;
  Swal.fire({
    icon: 'error',
    title,
    showConfirmButton: true,
    timer: 6000,
  });
}
