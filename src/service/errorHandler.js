async function handle_api_error(error) {
  try {
    return new Error(error.err_msg);
  } catch (err) {
    return err;
  }
}

export { handle_api_error };
