async function x() {
    return await y();
}
const y = async () => {
    return await z();
};